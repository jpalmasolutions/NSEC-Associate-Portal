import { hash, compare } from 'bcryptjs'

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12)
  return hashedPassword
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword)
  return isValid
}

export const API_URL = 'https://api.nsec-associate.com/api'
export const API_KEY = 'Riut9pZNjf8mtqSnfKkPr4yaRN901f6BaorYFydB'
