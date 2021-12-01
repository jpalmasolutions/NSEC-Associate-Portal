import { useState, useEffect } from 'react'
import { getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Layout from '../components/layout/Layout'
import RegisterForm from '../components/auth/RegisterForm'

function RegisterPage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/new')
      } else {
        setIsLoading(false)
      }
    })
  }, [router])

  // if (isLoading) {
  //   return <p>Loading...</p>
  // }
  return (
    <Layout>
      <RegisterForm />
    </Layout>
  )
}

export default RegisterPage
