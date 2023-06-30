/* eslint-disable import/no-extraneous-dependencies */
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { parseCookies } from 'nookies';
import decode from 'jwt-decode';
import { getUserAvailablePages } from './getUserAvailablePages';

export function withSSRGuest<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>
): GetServerSideProps {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    // eslint-disable-next-line no-return-await
    return await fn(ctx);
  };
}
