import AuthStore from './AuthStore';
import ApplicationStore from './ApplicationStore';
import { WebSocketStore } from './WebSocketStore';

export type RootStoreHydration = any;

export class RootStore {
  authStore: AuthStore;
  applicationStore: ApplicationStore;
  webSocketStore: WebSocketStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.applicationStore = new ApplicationStore(this);
    this.webSocketStore = new WebSocketStore(this);
  }
  // eslint-disable-next-line
  hydrate(initialData: RootStoreHydration) {
    console.log(initialData);
  }
}

export default RootStore;
