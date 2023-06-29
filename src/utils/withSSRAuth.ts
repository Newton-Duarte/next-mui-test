/* eslint-disable import/no-extraneous-dependencies */
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import decode from 'jwt-decode';
import { AuthTokenError } from './AuthTokenError';
import { validateUserPermissions } from './validateUserPermissions';

type WithSSRAuthOptions = {
  permissions?: string[];
};

export function withSSRAuth<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>,
  options?: WithSSRAuthOptions
): GetServerSideProps {
  return async (
    ctx: GetServerSidePropsContext
    // eslint-disable-next-line consistent-return
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['app.token'];

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    if (options) {
      const user = decode<{ permissions: string[]; is_admin: boolean }>(token);
      const { permissions } = options;

      const userHasValidPermissions = validateUserPermissions({
        user,
        permissions,
      });

      if (!userHasValidPermissions) {
        return {
          notFound: true,
        };
      }
    }

    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, 'app.token');
        destroyCookie(ctx, 'app.refreshToken');

        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }

      throw new Error('SSR Auth error');
    }
  };
}
