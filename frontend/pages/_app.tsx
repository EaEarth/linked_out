import '../styles/global.scss';
import axios from 'axios';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { enableStaticRendering } from 'mobx-react-lite';
import { RootStoreProvider } from '../stores/stores';

// Mobx SSR
const isServer = typeof window === 'undefined';
enableStaticRendering(isServer);
// Axios inject host
axios.defaults.baseURL =
  (isServer
    ? process.env.API_ENDPOINT_SSR
    : process.env.NEXT_PUBLIC_API_ENDPOINT) || 'http://localhost:8000/api';
axios.defaults.withCredentials = true;
// Axios inject token
axios.interceptors.request.use((config) => {
  if (!isServer) {
    // Client side only
    const accessToken = window.localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  }
  return config;
});
// DayJS Plugin
dayjs.extend(relativeTime);
dayjs.extend(duration);

export default function MyApp({ Component, pageProps }) {
  return (
    <RootStoreProvider hydrationData={pageProps.hydrationData}>
      <Component {...pageProps} />
    </RootStoreProvider>
  );
}
