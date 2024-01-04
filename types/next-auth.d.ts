import 'next-auth/jwt';
import { Session } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      role: string;
    } & DefaultSession['user'];
    accessToken?: string;
    idToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userRole?: Array;
    userPermissions?: Array;
    profile?: Profile;
    accessToken?: string;
    idToken?: string;
  }
}
