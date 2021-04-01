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
 
 @WebSocketGateway()
 export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
 
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UsersService
  ) {
  }
 
  // for testing
  @SubscribeMessage('msgToServer')
  testHandleMessage(client: Socket): void {
   this.server.emit('msgToClient',"test");
  }

  @SubscribeMessage('send_message')
  async listenForMessages(
    @MessageBody() content,
    @ConnectedSocket() socket: Socket,
  ) {
    const sender = await this.userService.findById(1)
    //const sender = await this.chatService.getUserFromSocket(socket);
    const message = await this.chatService.createMessage(sender, {
      "chatRoomId" : content.chatRoomId,
      "message" : content.message
    })

    this.server.sockets.emit('receive_message', {
      message,
      sender
    });
  }
 
  afterInit(server: Server) {
   console.log('Init');
  }
 
  handleDisconnect(client: Socket) {
   console.log(`Client disconnected`);
  }
 
  async handleConnection(socket: Socket) {
    console.log("Client connected")
    //await this.chatService.getUserFromSocket(socket);
  }
 }