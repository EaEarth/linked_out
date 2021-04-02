import { action, computed, makeObservable, observable } from "mobx";
import RootStore from "./RootStore";
import { io, Socket } from "socket.io-client";

export class WebSocketStore {
    private rootStore: RootStore;

    @observable
    socket?: Socket;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.socket = null
        makeObservable(this);
    }

    @action
    init(): void {
        this.socket = io(new URL(process.env.NEXT_PUBLIC_API_ENDPOINT).origin);
        this.socket.on('connect', () => {
            console.log('Connected');
        });
    }

    @action
    close(): void {
        this.socket?.disconnect();
    }

    @computed
    get isConnected(): boolean {
        return this.socket && this.socket.connected;
    }

}