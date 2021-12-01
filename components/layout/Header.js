import Link from 'next/link'
import { Disclosure } from '@headlessui/react'
import { FaTimes, FaBars } from 'react-icons/fa'
import { useSession, signOut } from 'next-auth/client'
import { useRouter } from 'next/router'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Header() {
  const [session, loading] = useSession()

  function logoutHandler() {
    signOut()
  }
  const router = useRouter()
  return (
    <Disclosure as='nav' className='bg-gray-800'>
      {({ open }) => (
        <>
          <div className='px-2 mx-auto max-w-7xl sm:px-6 lg:px-8'>
            <div className='relative flex items-center justify-between h-16'>
              <div className='absolute inset-y-0 right-0 flex items-center sm:hidden'>
                <Disclosure.Button className='inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <FaTimes className='block w-6 h-6' aria-hidden='true' />
                  ) : (
                    <FaBars className='block w-6 h-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex items-center justify-center flex-1 sm:items-stretch sm:justify-start'>
                <div className='flex items-center flex-shrink-0'>
                  <Link href='/new' className='text-white cursor-pointer'>
                    <div>
                      <img
                        src='/images/base-img.png'
                        alt='logo'
                        width='300'
                        height='300'
                        className='w-auto h-16 cursor-pointer '
                      />
                    </div>
                  </Link>
                </div>
                <div className='hidden sm:block sm:ml-6'>
                  <div className='flex items-center space-x-4 lg:py-6'>
                    {session && (
                      <>
                        <Link href={'/new'}>
                          <a
                            className={classNames(
                              router.pathname === '/new'
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-4 rounded-md text-sm font-medium'
                            )}
                            aria-current={
                              router.pathname === '/new' ? 'page' : undefined
                            }
                          >
                            New Lead
                          </a>
                        </Link>
                        <Link href={'/leads'}>
                          <a
                            className={classNames(
                              router.pathname === '/leads'
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-4 rounded-md text-sm font-medium'
                            )}
                            aria-current={
                              router.pathname === '/leads' ? 'page' : undefined
                            }
                          >
                            All Leads
                          </a>
                        </Link>
                        <button
                          className='px-3 py-4 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white'
                          onClick={logoutHandler}
                        >
                          Logout
                        </button>
                      </>
                    )}
                    {!session && !loading && (
                      <Link href={'/auth'}>
                        <a
                          className={classNames(
                            router.pathname === '/auth'
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-4 rounded-md text-sm font-medium'
                          )}
                          aria-current={
                            router.pathname === '/auth' ? 'page' : undefined
                          }
                        >
                          Login
                        </a>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {session && (
                <>
                  <Link href={'/new'}>
                    <a
                      className={classNames(
                        router.pathname === '/new'
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'px-3 py-4 rounded-md text-sm font-medium'
                      )}
                      aria-current={
                        router.pathname === '/new' ? 'page' : undefined
                      }
                    >
                      New Lead
                    </a>
                  </Link>
                  <Link href={'/leads'}>
                    <a
                      className={classNames(
                        router.pathname === '/leads'
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'px-3 py-4 rounded-md text-sm font-medium'
                      )}
                      aria-current={
                        router.pathname === '/leads' ? 'page' : undefined
                      }
                    >
                      All Leads
                    </a>
                  </Link>
                </>
              )}
              {!session && !loading && (
                <Link href={'/auth'}>
                  <a
                    className={classNames(
                      router.pathname === '/auth'
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'px-3 py-4 rounded-md text-sm font-medium'
                    )}
                    aria-current={
                      router.pathname === '/auth' ? 'page' : undefined
                    }
                  >
                    Login
                  </a>
                </Link>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Header
