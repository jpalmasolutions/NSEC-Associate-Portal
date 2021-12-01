import { useRouter } from 'next/router'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  const router = useRouter()
  return (
    <div>
      {router.pathname !== '/auth' && router.pathname !== '/register' && (
        <Header />
      )}
      <div>{children}</div>
      {router.pathname !== '/auth' && router.pathname !== '/register' && (
        <Footer />
      )}
    </div>
  )
}

export default Layout
