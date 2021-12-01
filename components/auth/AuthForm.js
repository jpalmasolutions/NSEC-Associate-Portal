import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { signIn } from 'next-auth/client'

const AuthForm = () => {
  const router = useRouter()
  return (
    <>
      <div className='flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8'>
        <div className='w-full max-w-lg px-20 border shadow-xl rounded-xl'>
          <h1 className='mt-20 mb-10 text-3xl font-semibold'>NSEC</h1>
          <h2 className='text-2xl'>Welcome Back!</h2>
          <h3 className='mt-2'>Please log in to your account</h3>
          <div className='mt-10'>
            <div>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                  password: Yup.string().required('No password provided'),
                })}
                onSubmit={async (values) => {
                  const result = await signIn('credentials', {
                    redirect: 'false',
                    email: values.email,
                    password: values.password,
                  })

                  if (!result.error) {
                    router.replace('/new')
                  }
                }}
              >
                <Form>
                  <div>
                    <label htmlFor='email'>Email Address</label>
                    <Field
                      label='Username'
                      name='email'
                      type='email'
                      placeholder='jane@doe.com'
                      className='block w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-md shadow-sm text-input focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    />
                  </div>
                  <div className='mt-6'>
                    <label htmlFor='password'>Password</label>
                    <Field
                      label='Password'
                      name='password'
                      type='password'
                      placeholder='Enter your password'
                      className='block w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-md shadow-sm text-input focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    />
                  </div>

                  <button
                    type='submit'
                    className='relative flex justify-center w-full px-4 py-3 my-8 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md group hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400'
                  >
                    Log In
                  </button>

                  <div className='mt-4 text-center underline'>
                    <Link href='/register'>
                      <a>Don't have an account? Sign up now</a>
                    </Link>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
          <div className='mt-4 text-center underline'></div>
        </div>
        <div className='max-w-full min-h-full bg-no-repeat bg-cover col-span-0 lg:col-span-4 bg-hero-img'></div>
      </div>
    </>
  )
}

export default AuthForm
