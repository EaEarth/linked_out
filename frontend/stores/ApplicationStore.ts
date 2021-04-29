import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import RootStore from './RootStore';
import axios, { AxiosError } from 'axios';

export class ApplicationStore {
  private rootStore: RootStore;
  @observable
  id: number | null;
  @observable
  show: boolean;

  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
    this.show = false;
  }

  @action
  async uploadFile(file): Promise<void> {
    let formData = new FormData();
    formData.append('file', file, file.name);
    try {
      const response = await axios.post('/files/upload', formData);
      runInAction(() => {
        if (response.status === 201) {
          this.id = response.data.id;
        }
      });
    } catch (err) {
      runInAction(() => {
        console.log(err);
      });
    }
  }

  @action
  async apply(payload): Promise<void> {
    try {
      const response = await axios.post('/job-application', payload);
      runInAction(() => {
        if (response.status === 201) {
          this.show = true;
        }
      });
    } catch (err) {
      runInAction(() => {
        console.log(err);
      });
    }
  }
}

export default ApplicationStore;
