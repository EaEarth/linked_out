import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { parse } from 'cookie';
import { ChatRoom } from 'src/entities/chats/chatRoom.entity';
import { Message } from 'src/entities/chats/message.entity';
import { User } from 'src/entities/users/user.entity';
import { JobService } from 'src/job-announcement/job.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { createChatRoom } from './chatDto/create-chat-room.dto';
import { createMessage } from './chatDto/create-message.dto';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRoom)
    private readonly chatRoomRepo: Repository<ChatRoom>,
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
    private usersService: UsersService,
    private jobService: JobService,
    private userService: UsersService,
  ) {}

  async getUserFromSocket(socket: Socket): Promise<User> {
    const cookie = socket.handshake.headers.cookie;
    //const { Authentication: authenticationToken } = parse(cookie);
    const cookieSplit = cookie.split(' ')
    var jwt, jwtToken
    if(cookieSplit[1].startsWith("jwt="))jwt = cookieSplit[1].split("jwt=s%3A")
    else jwt = cookieSplit[0].split("jwt=s%3A")
    if(jwt[1].endsWith(";")) jwtToken = jwt[1].split(";")[0]
    else jwtToken =jwt[1]
    const user = await this.userService.getUserFromAuthenticationToken(
      jwtToken.split("%")[0],
    );
    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    return user;
  }

  indexChatRoom(): Promise<ChatRoom[]> {
    return this.queryBuilderChatRoom().getMany();
  }

  findChatRoomById(chatRoomId: number, userId: number): Promise<ChatRoom> {
    return this.queryBuilderChatRoom()
      .where('chatroom.id = :id', { id: chatRoomId })
      .getOne();
  }

  async findMessageById(user: User, messageId: number): Promise<Message> {
    const message = await this.messageRepo
      .createQueryBuilder('message')
      .where('message.id = :id', { id: messageId })
      .leftJoinAndSelect('message.chatRoom', 'chatRoom')
      .leftJoinAndSelect('chatRoom.recruiter', 'recruiter')
      .leftJoinAndSelect('chatRoom.applicant', 'applicant')
      .leftJoinAndSelect('message.sender', 'sender')
      .getOne();
    if (message === undefined) throw new NotFoundException('Message not found');
    if (
      message.chatRoom.recruiter.id !== user.id &&
      message.chatRoom.applicant.id !== user.id
    )
      throw new UnauthorizedException("User can't acces to this message");
    return message;
  }

  indexChatRoomByRecruiter(recruiterId: number): Promise<ChatRoom[]> {
    return this.queryBuilderChatRoom()
      .where('recruiter.id = :id', { id: recruiterId })
      .getMany();
  }

  indexChatRoomByApplicant(applicantId: number): Promise<ChatRoom[]> {
    return this.queryBuilderChatRoom()
      .where('applicant.id = :id', { id: applicantId })
      .getMany();
  }

  indexChatRoomByMember(userId: number): Promise<ChatRoom[]> {
    return this.queryBuilderChatRoom()
      .where('applicant.id = :id', { id: userId })
      .orWhere('recruiter.id = :id', { id: userId })
      .getMany();
  }

  indexChatRoomByJobAnnouncement(
    jobAnnouncementId: number,
    userId: number,
  ): Promise<ChatRoom[]> {
    return this.queryBuilderChatRoom()
      .where('announcement.id = :id', { id: jobAnnouncementId })
      .getMany();
  }

  private queryBuilderChatRoom() {
    return this.chatRoomRepo
      .createQueryBuilder('chatroom')
      .leftJoinAndSelect('chatroom.recruiter', 'recruiter')
      .leftJoinAndSelect('recruiter.avatarFile', 'recruiterPict')
      .leftJoinAndSelect('chatroom.applicant', 'applicant')
      .leftJoinAndSelect('applicant.avatarFile', 'applicantPict')
      .leftJoinAndSelect('chatroom.jobAnnouncement', 'announcement');
  }

  async indexMessageFromChatRoom(
    id: number,
    userId: number,
  ): Promise<Message[]> {
    const chatRoom = await this.chatRoomRepo.findOne(id, {
      relations: ['recruiter', 'applicant'],
    });
    if (chatRoom.applicant.id !== userId && chatRoom.recruiter.id !== userId)
      throw new UnauthorizedException("User can't acces to this chat room");
    return this.messageRepo
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.chatRoom', 'chatRoom')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('sender.avatarFile', 'pict')
      .where('chatRoom.id = :id', { id: id })
      .getMany();
  }

  async createChatRoom(creater: User, dto: createChatRoom) {
    if (creater.id === dto.applicantId)
      throw new BadRequestException("Can't create chat with yourself");
    const applicant = await this.usersService.findById(dto.applicantId);
    if (applicant === undefined)
      throw new NotFoundException('Applicant not found');
    const jobAnnouncementChat = await this.jobService.findByIdWithOwner(
      dto.jobAnnouncementId,
    );
    if (jobAnnouncementChat === undefined)
      throw new NotFoundException('Job announcement not found');
    if (jobAnnouncementChat.owner.id !== creater.id)
      throw new UnauthorizedException(
        'Must be owner of the job announcement for creating chat room',
      );
    const recruiterUser = await this.usersService.findById(creater.id);
    var chatRoom = new ChatRoom();
    chatRoom.recruiter = recruiterUser;
    chatRoom.applicant = applicant;
    chatRoom.jobAnnouncement = jobAnnouncementChat;
    const chatEntity = await this.chatRoomRepo.save(chatRoom);
    const { jobAnnouncement, ...chat } = chatEntity;
    return chat;
  }

  async createMessage(user: User, dto: createMessage) {
    const { chatRoomId, ...content } = dto;
    const chatRoom = await this.findChatRoomById(chatRoomId, user.id);
    if (chatRoom === undefined)
      throw new NotFoundException("Chat room doesn't exist");
    if (chatRoom.applicant.id !== user.id && chatRoom.recruiter.id !== user.id)
      throw new UnauthorizedException("User can't acces to this chat room");
    const sender = await this.usersService.findById(user.id);
    const message = { ...new Message(), ...content };
    message.sender = sender;
    message.chatRoom = chatRoom;
    return this.messageRepo.save(message);
  }

  async deleteChatRoom(user: User, chatRoomId: number): Promise<ChatRoom> {
    const chatRoom = await this.findChatRoomById(chatRoomId, user.id);
    if (chatRoom.applicant.id !== user.id && chatRoom.recruiter.id !== user.id)
      throw new UnauthorizedException("User can't acces to this chat room");
    this.chatRoomRepo.remove(chatRoom);
    return chatRoom;
  }

  async deleteMessage(user: User, messageId: number): Promise<Message> {
    const message = await this.messageRepo.findOne(messageId, {
      relations: ['sender', 'chatRoom'],
    });
    if (message === undefined)
      throw new NotFoundException("Message doesn't exist");
    if (user.id !== message.sender.id)
      throw new UnauthorizedException('Only sender can delete message');
    this.messageRepo.remove(message);
    return message;
  }

  //
  //
  //
  //  PAGINATE VERSION
  //
  //
  //

  indexChatRoomPaginate(
    page: number,
    limit: number,
  ): Promise<Pagination<ChatRoom>> {
    const qb = this.queryBuilderChatRoom();
    return paginate<ChatRoom>(qb, {
      page,
      limit,
      route: 'http://localhost:8000/api/chat/paginate/index',
    });
  }

  indexChatRoomByRecruiterPaginate(
    recruiterId: number,
    page: number,
    limit: number,
  ): Promise<Pagination<ChatRoom>> {
    const qb = this.queryBuilderChatRoom().where('recruiter.id = :id', {
      id: recruiterId,
    });
    return paginate(qb, {
      page,
      limit,
      route:
        'http://localhost:8000/api/chat/paginate/index/recruiter/chat-room',
    });
  }

  indexChatRoomByApplicantPaginate(
    applicantId: number,
    page: number,
    limit: number,
  ): Promise<Pagination<ChatRoom>> {
    const qb = this.queryBuilderChatRoom().where('applicant.id = :id', {
      id: applicantId,
    });
    return paginate(qb, {
      page,
      limit,
      route:
        'http://localhost:8000/api/chat/paginate/index/applicant/chat-room',
    });
  }

  indexChatRoomByMemberPaginate(
    userId: number,
    page: number,
    limit: number,
  ): Promise<Pagination<ChatRoom>> {
    const qb = this.queryBuilderChatRoom()
      .where('applicant.id = :id', { id: userId })
      .orWhere('recruiter.id = :id', { id: userId });
    return paginate(qb, {
      page,
      limit,
      route: 'http://localhost:8000/api/chat/paginate/index/member/chat-room',
    });
  }

  indexChatRoomByJobAnnouncementPaginate(
    jobAnnouncementId: number,
    userId: number,
    page: number,
    limit: number,
  ): Promise<Pagination<ChatRoom>> {
    const qb = this.queryBuilderChatRoom().where('announcement.id = :id', {
      id: jobAnnouncementId,
    });
    return paginate(qb, {
      page,
      limit,
      route:
        'http://localhost:8000/api/chat/paginate/index/job-announcement/' +
        jobAnnouncementId +
        '/chat-room',
    });
  }

  async indexMessageFromChatRoomPaginate(
    id: number,
    userId: number,
    page: number,
    limit: number,
  ): Promise<Pagination<Message>> {
    const chatRoom = await this.chatRoomRepo.findOne(id, {
      relations: ['recruiter', 'applicant'],
    });
    if (chatRoom.applicant.id !== userId && chatRoom.recruiter.id !== userId)
      throw new UnauthorizedException("User can't acces to this chat room");
    const qb = this.messageRepo
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.chatRoom', 'chatRoom')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('sender.avatarFile', 'pict')
      .where('chatRoom.id = :id', { id: id });
    return paginate(qb, {
      page,
      limit,
      route:
        'http://localhost:8000/api/chat/paginate/index/message/chat-room/' + id,
    });
  }
}
