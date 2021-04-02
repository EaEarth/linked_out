import { action, computed, makeObservable, observable } from "mobx";
import RootStore from "./RootStore";
import { io, Socket } from "socket.io-client";

export class WebSocketStore {
    private rootStore: RootStore;

    @observable
    socket?: Socket;

    @observable
    url?: string;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.socket = null
        const urlObject = new URL(process.env.NEXT_PUBLIC_API_ENDPOINT);
        this.url = `ws://${urlObject.host}`;
        this.socket = io(this.url);
        makeObservable(this);
    }

    @action
    init(): void {
        this.socket.connect();
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