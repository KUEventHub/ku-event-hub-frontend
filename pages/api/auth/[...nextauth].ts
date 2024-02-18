import { lastLogin } from '@/services/users';
import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
      authorization: {
        params: {
          audience: encodeURI(process.env.AUTH0_AUDIENCE as string),
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, profile, account }) {
      if (profile && account) {
        token.profile = profile;
        const userRole = token.profile['ku-event-hub-roles'];
        const userPermissions = token.profile['ku-event-hub-permissions'];
        token.name = token.profile['name'];
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        if (userRole?.length > 0 && userPermissions?.length > 0) {
          token.userRole = userRole;
          token.userPermissions = userPermissions;
        } else {
          token.userRole = ['User'];
          token.userPermissions = ['read:events'];
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.userRole;
      session.user.permissions = token.userPermissions;
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      return session;
    },
  },
  events: {
    async signIn({ account }) {
      if (account && account.access_token) {
        await lastLogin(account.access_token);
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
  },
};
export default NextAuth(authOptions);
