import axios, { AxiosInstance } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { NextApiRequestCookies } from 'next/dist/next-server/server/api-utils';
import { IncomingMessage } from 'node:http';

export function makeServerAxios(context: { req?: IncomingMessage & { cookies: NextApiRequestCookies } }): AxiosInstance {
  const cookie = context.req.cookies;
  return axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:8000/api',
    headers: {
      Cookie: `jwt=${cookie['jwt']}`,
    }
  });
}

type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export function isServerReq(req: PropType<GetServerSidePropsContext, 'req'>): boolean {
  return !req.url.startsWith('/_next');
}
