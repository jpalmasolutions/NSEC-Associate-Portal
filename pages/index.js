import { getSession } from 'next-auth/client'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/layout/Layout'
import NewLeadForm from '../components/newLead/NewLeadForm'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/auth')
  }, [router])

  return (
    <Layout>
      <NewLeadForm />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: '/auth',
  //       permanent: false,
  //     },
  //   }
  // }

  return {
    props: { session },
  }
}
