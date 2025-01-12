import { connectdb } from '@/libs/utils'
import User from '@/models/User'
import NextAuth from 'next-auth/next'
import Credentials from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'something@gmail.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'password',
        },
      },
      async authorize(credentials) {
        await connectdb()
        const user = await User.findOne({ email: credentials.email })
        if (!user) {
          return null
        }
        const isPasswordCorrect = await user.comparePassword(
          credentials.password
        )
        if (!isPasswordCorrect) {
          return null
        }
        return { 
          id: user._id, 
          email: user.email, 
          isAdmin: user.isAdmin, 
          username: user.username }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
        token.email = user.email
        token.username = user.username
        token.isAdmin = user.isAdmin
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.sub
      session.user.email = token.email
      session.user.username = token.username
      session.user.isAdmin = token.isAdmin
      return session
    },
    async redirect({ baseUrl }) {
      return baseUrl
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
