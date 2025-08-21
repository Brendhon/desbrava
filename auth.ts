import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { DashboardRoutes, HomeRoutes } from './lib/types';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: HomeRoutes.home(),
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redireciona para dashboard após login bem-sucedido
      if (url.startsWith(baseUrl))
        return `${baseUrl}${DashboardRoutes.dashboard()}`;
      // Permite redirecionamentos externos (Google OAuth)
      else if (url.startsWith(HomeRoutes.home())) return `${baseUrl}${url}`;
      return baseUrl;
    },
  },
});
