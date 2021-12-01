import { getSession } from 'next-auth/client'
import Layout from '../components/layout/Layout'
import LeadsGrid from '../components/leads/LeadsGrid'

function AllLeads() {
  return (
    <Layout>
      <LeadsGrid />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

export default AllLeads
