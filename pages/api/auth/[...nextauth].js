import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { verifyPassword } from '../../../lib/auth'

export default NextAuth({
  session: { jwt: true, maxAge: 60 * 60 * 24 },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        try {
          // Check if there is a user
          const user = await axios.get(
            `${API_URL}/user`,
            {
              Email: credentials.Email,
            },
            {
              headers: {
                accept: '*/*',
                'Content-Type': 'application/json',
              },
            }
          )

          if (!user) {
          } else {
            const userData = await axios.post(
              `${API_URL}/auth/login`,
              {
                Password: credentials.Password,
                Email: credentials.Email,
              },
              {
                headers: {
                  accept: '*/*',
                  'Content-Type': 'application/json',
                },
              }
            )

            if (userData) {
              const isValid = await verifyPassword(
                credentials.Password,
                userData.Password
              )
              if (!isValid) {
                throw new Error('Invalid email or password!')
              } else {
                return { status: 'success', data: userData.data }
              }
            } else {
              throw new Error('No user found!')
            }
          }
        } catch (e) {
          console.log(e)
        }
      },
    }),
  ],
})
