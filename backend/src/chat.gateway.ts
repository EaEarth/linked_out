import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat/chat.service';
import { UsersService } from './users/users.service';
<<<<<<< HEAD
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
=======

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

>>>>>>> 987e9e41dd3ccbb953ef31386fdc509c6fde3e8f
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  constructor(
    private readonly chatService: ChatService,
<<<<<<< HEAD
    private readonly userService: UsersService,
  ) {}
=======
    private readonly userService: UsersService
  ) {
  }
>>>>>>> 987e9e41dd3ccbb953ef31386fdc509c6fde3e8f

  // for testing
  @SubscribeMessage('msgToServer')
  testHandleMessage(client: Socket): void {
<<<<<<< HEAD
    this.server.emit('msgToClient', 'test');
=======
    this.server.emit('msgToClient', "test");
>>>>>>> 987e9e41dd3ccbb953ef31386fdc509c6fde3e8f
  }

  @SubscribeMessage('send_message')
  async listenForMessages(
    @MessageBody() content,
    @ConnectedSocket() socket: Socket,
  ) {
    const sender = await this.userService.findById(1);
    //const sender = await this.chatService.getUserFromSocket(socket);
    const message = await this.chatService.createMessage(sender, {
<<<<<<< HEAD
      chatRoomId: content.chatRoomId,
      message: content.message,
    });
=======
      "chatRoomId": content.chatRoomId,
      "message": content.message
    })
>>>>>>> 987e9e41dd3ccbb953ef31386fdc509c6fde3e8f

    this.server.sockets.emit('receive_message', {
      message,
      sender,
    });
  }

  afterInit(server: Server) {
    console.log('Init');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected`);
  }

<<<<<<< HEAD
  @UseGuards(JwtAuthGuard)
  async handleConnection(socket: Socket) {
    console.log('Client connected');
=======
  async handleConnection(socket: Socket) {
    console.log("Client connected");
>>>>>>> 987e9e41dd3ccbb953ef31386fdc509c6fde3e8f
    //await this.chatService.getUserFromSocket(socket);
  }
}
