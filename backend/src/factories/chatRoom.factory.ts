import { define } from "typeorm-seeding";
import { ChatRoom } from "../entities/chats/chatRoom.entity";

define(ChatRoom, () => {
    return new ChatRoom();
})