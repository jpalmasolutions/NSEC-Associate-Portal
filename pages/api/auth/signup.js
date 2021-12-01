import { hashPassword } from '../../../lib/auth'
import { API_URL, API_KEY } from '../../../lib/auth'
import axios from 'axios'

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body

      const hashedPassword = await hashPassword(data.Password)

      const user = await axios.post(
        `${API_URL}/auth/register`,
        {
          FirstName: data.FirstName,
          LastName: data.LastName,
          Password: hashedPassword,
          PhoneNumber: data.PhoneNumber,
          Role: 'Admin',
          Email: data.Email,
        },
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
          },
        }
      )
      res.status(201).json({ message: 'Created User!' })
    } catch (e) {
      console.log(e)
    }
  }
}

export default handler
