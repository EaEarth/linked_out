import {
  action,
  autorun,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import jwtDecode from 'jwt-decode';
import RootStore from './RootStore';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';

interface JWTToken {
  username: string;
  sub: number;
  isAdmin: boolean;
  iat: number;
  exp: number;
}

export class AuthStore {
  private rootStore: RootStore;
  @observable
  accessToken: string | null;
  @observable
  loginError: string | null;

  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
    this.accessToken = null;
    this.init();
    autorun(() => {
      if (rootStore.webSocketStore)
        rootStore.webSocketStore.setCookie(this.accessToken);
    });
  }

  @action
  init(): void {
    if (typeof window !== 'undefined') {
      this.accessToken = window.localStorage.getItem('accessToken');
      // if the token is already expired
      if (this.decodedToken.exp <= dayjs().unix()) {
        this.logout();
      }
    }
  }

  @action
  async login(username: string, password: string): Promise<void> {
    runInAction(() => {
      this.loginError = null;
    });
    try {
      const { data } = await axios.post('/auth/login', {
        username,
        password,
      });
      // set access token
      window.localStorage.setItem('accessToken', data.access_token);
      runInAction(() => {
        this.accessToken = data.access_token;
      });
    } catch (err) {
      runInAction(() => {
        if ((err as AxiosError).response?.status === 401) {
          this.loginError = 'Username or password is incorrect.';
        } else {
          this.loginError = 'Something went wrong. Please try again.';
        }
      });
    }
  }

  @action
  async logout(): Promise<void> {
    try {
      await axios.post('/auth/logout');
      runInAction(() => {
        this.accessToken = null;
        window.localStorage.removeItem('accessToken');
      });
    } catch (err) {
      if ((err as AxiosError).response?.status !== 200) {
        console.error('Problem while attempting to log out:', err.stack);
      } else {
        console.error('Something went wrong:', err.stack);
      }
    }
  }

  @computed
  get decodedToken(): JWTToken {
    const fallback: JWTToken = {
      username: 'Guest',
      sub: -1,
      isAdmin: false,
      iat: -1,
      exp: -1,
    };
    if (!this.isLoggedIn) {
      return fallback;
    }
    try {
      return jwtDecode<JWTToken>(this.accessToken);
    } catch (err) {
      return fallback;
    }
  }

  @computed
  get isLoggedIn(): boolean {
    return this.accessToken !== null;
  }

  @computed
  get username(): string {
    return this.decodedToken.username;
  }

  @computed
  get isAdmin(): boolean {
    return this.decodedToken.isAdmin;
  }
}

export default AuthStore;
