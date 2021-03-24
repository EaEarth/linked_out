import { define } from "typeorm-seeding";
import Faker, {fake} from 'faker';
import { Message } from "../entities/chats/message.entity";
import { User } from "../entities/users/user.entity";
import { ChatRoom } from "../entities/chats/chatRoom.entity";

define(Message, (faker: typeof Faker, settings: {sender: User}) => {
    const message = new Message();
    message.message = faker.lorem.paragraph();
    message.sender = settings.sender;
    
    return message;
})