import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChatRoom } from 'src/entities/chats/chatRoom.entity';
import { Message } from 'src/entities/chats/message.entity';
import { ChatService } from './chat.service';
import { createChatRoom } from './chatDto/create-chat-room.dto';
import { createMessage } from './chatDto/create-message.dto';

@Controller('chat')
export class ChatController {
    constructor(private readonly service: ChatService) {}

    @Get('index')
    async indexChatRoom( ): Promise<ChatRoom[]> {
        return this.service.indexChatRoom();
    }

    @Get('index/message/:id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async indexMessageById(@Request() req, @Param('id', new ParseIntPipe()) id: number): Promise<Message> {
        return this.service.findMessageById(req.user,id);
    }

    @Get('index/chat-room/:id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async indexChatRoomById( @Param('id', new ParseIntPipe()) id: number): Promise<ChatRoom> {
        return this.service.findChatRoomById(id);
    }

    @Get('index/recruiter/chat-room')
    @UseGuards(JwtAuthGuard)
    async indexChatRoomByRecruiter(@Request() req): Promise<ChatRoom[]> {
        return this.service.indexChatRoomByRecruiter(req.user.id)
    }

    @Get('index/applicant/chat-room')
    @UseGuards(JwtAuthGuard)
    async indexChatRoomByApplicant(@Request() req): Promise<ChatRoom[]> {
        return this.service.indexChatRoomByApplicant(req.user.id)
    }

    @Get('index/member/chat-room')
    @UseGuards(JwtAuthGuard)
    async indexChatRoomByMember(@Request() req): Promise<ChatRoom[]> {
        return this.service.indexChatRoomByMember(req.user.id)
    }

    @Get('index/job-announcement/:id/chat-room')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async indexChatRoomByJobAnnouncement(@Param('id', new ParseIntPipe()) id: number): Promise<ChatRoom[]> {
        return this.service.indexChatRoomByJobAnnouncement(id);
    }

    @Get('index/message/chat-room/:roomId')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async indexMessage(@Request() req,
        @Param('roomId', new ParseIntPipe()) id: number,
    ): Promise<Message[]> {
        return this.service.indexMessageFromChatRoom(id,req.user.id);
    }

    @Post("chat-room")
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async createChatRoom(
      @Request() req,
      @Body() dto: createChatRoom,
    ){
      return this.service.createChatRoom(req.user, dto);
    }

    @Post("message")
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async createMessage(
      @Request() req,
      @Body() dto: createMessage,
    ): Promise<Message> {
      return this.service.createMessage(req.user, dto);
    }

    @Delete('chat-room/:id')
    @UseGuards(JwtAuthGuard)
    async deleteChatRoom(
      @Request() req,
      @Param('id', new ParseIntPipe()) id: number,
    ): Promise<ChatRoom> {
      return this.service.deleteChatRoom(req.user, id);
    }

    @Delete('message/:id')
    @UseGuards(JwtAuthGuard)
    async deleteMessage(
      @Request() req,
      @Param('id', new ParseIntPipe()) id: number,
    ): Promise<Message> {
      return this.service.deleteMessage(req.user, id);
    }

    //     
    // 
    //  PAGINATE VERSION
    // 
    //     

    @Get('paginate/index')
    async indexChatRoomPaginate(  
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<Pagination<ChatRoom>> {
        return this.service.indexChatRoomPaginate(page, limit);
    }

    @Get('paginate/index/recruiter/chat-room')
    @UseGuards(JwtAuthGuard)
    async indexChatRoomByRecruiterPaginate( 
        @Request() req, 
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<Pagination<ChatRoom>> {
        return this.service.indexChatRoomByRecruiterPaginate(req.user.id,page, limit);
    }

    @Get('paginate/index/applicant/chat-room')
    @UseGuards(JwtAuthGuard)
    async indexChatRoomByApplicantPaginate(  
        @Request() req,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<Pagination<ChatRoom>> {
        return this.service.indexChatRoomByApplicantPaginate(req.user.id,page, limit);
    }

    @Get('paginate/index/job-announcement/:id/chat-room')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async indexChatRoomByJobAnnouncementPaginate(  
        @Param('id', new ParseIntPipe()) id: number,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<Pagination<ChatRoom>> {
        return this.service.indexChatRoomByJobAnnouncementPaginate(id,page, limit);
    }

    @Get('paginate/index/member/chat-room')
    @UseGuards(JwtAuthGuard)
    async indexChatRoomByMemberPaginate(  
        @Request() req,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<Pagination<ChatRoom>> {
        return this.service.indexChatRoomByMemberPaginate(req.user.id,page, limit);
    }

    @Get('paginate/index/message/chat-room/:roomId')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async indexMessagePaginate(
        @Request() req,
        @Param('roomId', new ParseIntPipe()) id: number,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<Pagination<Message>> {
        return this.service.indexMessageFromChatRoomPaginate(id,req.user.id, page, limit);
    }
}
