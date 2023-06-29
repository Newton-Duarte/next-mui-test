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
    const cookies = parseCookies(ctx);
    const token = cookies['app.token'];

    if (token) {
      const user = decode<{ permissions: string[]; is_admin: boolean }>(token);

      const userAvailablePages: string[] = getUserAvailablePages(
        user.permissions
      );

      if (user.is_admin || userAvailablePages.includes('dashboard')) {
        return {
          redirect: {
            destination: '/dashboard',
            permanent: false,
          },
        };
      }

      const firstAvailablePage = userAvailablePages[0];

      if (!firstAvailablePage) {
        return {
          notFound: true,
        };
      }

      return {
        redirect: {
          destination: `/${firstAvailablePage}`,
          permanent: false,
        },
      };
    }

    // eslint-disable-next-line no-return-await
    return await fn(ctx);
  };
}
