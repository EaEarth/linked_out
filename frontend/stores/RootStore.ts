import AuthStore from './AuthStore';
import ApplicationStore from './ApplicationStore';

export type RootStoreHydration = any;

export class RootStore {
  authStore: AuthStore;
  applicationStore: ApplicationStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.applicationStore = new ApplicationStore(this);
  }
  // eslint-disable-next-line
  hydrate(initialData: RootStoreHydration) {
    console.log(initialData);
  }
}

export default RootStore;
