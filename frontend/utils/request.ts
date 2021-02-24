import axios from 'axios';
import { GetServerSidePropsContext } from 'next';

export function makeServerAxios(context: GetServerSidePropsContext) {
  return axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:8000/api',
    headers: {
      Authorization: context.req.headers.authorization
        ? `Bearer ${context.req.headers.authorization}`
        : null,
    },
  });
}
