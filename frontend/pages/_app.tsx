import '../styles/global.scss';
import axios from 'axios';

export default function MyApp({ Component, pageProps }) {
  axios.defaults.withCredentials = true;
  return <Component {...pageProps} />;
}
