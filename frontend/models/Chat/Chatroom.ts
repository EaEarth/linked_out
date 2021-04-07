export interface ChatRoom {
  id: number;
  recruiter: {
    id: number;
    username: string;
    hashedPassword: string;
    email: string;
    prefix: string;
    firstname: string;
    lastname: string;
    birthDate: Date;
    address: string;
    latitude: number;
    longtitude: number;
    telNumber: string;
    vertifyAt: Date;
    isAdmin: boolean;
    avatarFile: {
      id: number;
      title: string;
      type: string;
      path: string;
    };
  };
  applicant: {
    id: number;
    username: string;
    hashedPassword: string;
    email: string;
    prefix: string;
    firstname: string;
    lastname: string;
    birthDate: Date;
    address: string;
    latitude: number;
    longtitude: number;
    telNumber: string;
    vertifyAt: Date;
    isAdmin: boolean;
    avatarFile: {
      id: number;
      title: string;
      type: string;
      path: string;
    };
  };
}

export default ChatRoom;
