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
import { Logger } from '@nestjs/common';
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

>>>>>>> d46569c107ba2c7b04f6279cd66e3edc675073a7
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
>>>>>>> d46569c107ba2c7b04f6279cd66e3edc675073a7

  // for testing
  @SubscribeMessage('msgToServer')
  testHandleMessage(client: Socket): void {
<<<<<<< HEAD
    this.server.emit('msgToClient', 'test');
=======
    this.server.emit('msgToClient', "test");
>>>>>>> d46569c107ba2c7b04f6279cd66e3edc675073a7
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
>>>>>>> d46569c107ba2c7b04f6279cd66e3edc675073a7

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
  @JwtAuthGuard()
  async handleConnection(socket: Socket) {
    console.log('Client connected');
    //await this.chatService.getUserFromSocket(socket);
  }
}
=======
  async handleConnection(socket: Socket) {
    console.log("Client connected");
    //await this.chatService.getUserFromSocket(socket);
  }
}
>>>>>>> d46569c107ba2c7b04f6279cd66e3edc675073a7
