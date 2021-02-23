import '../styles/global.scss';
import axios from 'axios';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

export default function MyApp({ Component, pageProps }) {
  axios.defaults.withCredentials = true;
  // DayJS Plugin
  dayjs.extend(relativeTime);
  dayjs.extend(duration);
  return <Component {...pageProps} />;
}
