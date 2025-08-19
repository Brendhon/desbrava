import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redireciona para dashboard após login bem-sucedido
      if (url.startsWith(baseUrl)) return `${baseUrl}/dashboard`
      // Permite redirecionamentos externos (Google OAuth)
      else if (url.startsWith("/")) return `${baseUrl}${url}`
      return baseUrl
    },
  },
})
