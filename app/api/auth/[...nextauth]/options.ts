import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
//import Google from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username:',
          type: 'text',
          placeholder: 'username',
        },
        password: {
          label: 'Password:',
          type: 'password',
        },
      },
      async authorize(credentials, req) {
        const user = {
          id: 1,
          username: 'jdoe',
          password: 'john',
          name: 'John Doe',
        }
        if (
          credentials?.username === user.username &&
          credentials?.password === user.password
        ) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  debug: true,
  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
}
