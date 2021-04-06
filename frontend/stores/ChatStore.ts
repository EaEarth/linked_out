import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';
import AuthStore from './AuthStore';

export class ChatStore {
  @observable
  message: Array<[]>;
  @observable
  currentChatRoomId: number;

  constructor() {
    this.message = [];
    this.currentChatRoomId = null;
    makeObservable(this);
  }

  @action
  async fetchChatLists() {
    const cookie = AuthStore;
    const { data } = await axios.get(
      'http://localhost:8000/api/chat/index/member/chat-room',
      {
        headers: {
          Cookie: `jwt=${cookie['jwt']}`,
        },
      }
    );
    return {
      props: {
        chatrooms: data,
        cookie: cookie,
      },
    };
  }
}

export default ChatStore;
