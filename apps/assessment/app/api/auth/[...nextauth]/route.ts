import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        // const res = await fetch('https://api.celom.com/v1/auth/login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     email: credentials.email,
        //     password: credentials.password,
        //   }),
        // })

        // mock above call
        const res = {
          ok: true,
          json: async () => ({
            token: 'mocked_token  ' + credentials.email,
            email: credentials.email,
          }) as any
        }

        const user = await res.json()

        if (res.ok && user) {
          return user
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: any, user?: any }) {
      if (user) {
        token.accessToken = user.token
      }
      return token
    },
    async session({ session, token }: { session: any, token: any }) {
      session.accessToken = token.accessToken
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }