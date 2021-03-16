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
    resumeId: number | null;
    @observable
    coverLetterId: number | null;
    @observable
    transcriptId: number | null;
    @observable
    show: boolean;

    constructor(rootStore: RootStore) {
        makeObservable(this);
        this.rootStore = rootStore;
        this.show = false;
    }

    @action
    async uploadFile(file, name: string): Promise<void> {
        let formData = new FormData();
        formData.append('file', file, file.name);
        try {
            const response = await axios.post('http://localhost:8000/api/files/upload', formData);
            runInAction(() => {
                if (response.status === 201) {
                    if (name === 'resume') {
                        this.resumeId = response.data.id;
                    } else if (name === 'coverLetter') {
                        this.coverLetterId = response.data.id;
                    } else if (name === 'transcript') {
                        this.transcriptId = response.data.id;
                    }
                }
            });
        } catch (err) {
            runInAction(() => {
                console.log(err);
            });
        }
    };

    @action
    async apply(payload): Promise<void> {
        try {
            const response = await axios.post('/job-application',
                payload
            )
            runInAction(() => {
                if (response.status === 201) {
                    this.show = true;
                }
            })
        } catch (err) {
            runInAction(() => {
                console.log(err);
            });
        }
    }
}

export default ApplicationStore;