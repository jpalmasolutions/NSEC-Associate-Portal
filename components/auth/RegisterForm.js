import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { signIn } from 'next-auth/client'

async function createUser(data) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!')
  }
}

const AuthForm = () => {
  const router = useRouter()
  return (
    <>
      <div className='flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8'>
        <div className='w-full max-w-lg px-20 border shadow-xl rounded-xl'>
          <h1 className='mt-20 mb-10 text-3xl font-semibold'>NSEC</h1>
          <h2 className='text-2xl'>Create an account</h2>
          <h3 className='mt-2'>Please fill out the information below</h3>
          <div className='mt-10'>
            <div>
              <Formik
                initialValues={{
                  FirstName: '',
                  LastName: '',
                  PhoneNumber: '',
                  Email: '',
                  Password: '',
                  Role: '',
                }}
                validationSchema={Yup.object({
                  FirstName: Yup.string()
                    .min(2, 'Too Short!')
                    .max(50, 'Too Long!')
                    .required('Required'),
                  LastName: Yup.string()
                    .min(2, 'Too Short!')
                    .max(50, 'Too Long!')
                    .required('Required'),
                  PhoneNumber: Yup.string()
                    .min(9, 'Too Short!')
                    .max(15, 'Too Long!')
                    .required('Required'),
                  Role: Yup.string().min(3, 'Too Short!').required('Required'),
                  Email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                  Password: Yup.string()
                    .min(6, 'Too Short!')
                    .required('No password provided'),
                })}
                onSubmit={async (values) => {
                  // @todo need to check if the user already exists
                  // Then create user
                  // const result = await signIn('credentials', {
                  //   redirect: 'false',
                  //   email: values.email,
                  //   password: values.password,
                  // })
                  try {
                    await createUser(values)
                    router.replace('/new')
                  } catch (error) {
                    console.log(error)
                  }
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div>
                      <label htmlFor='FirstName'>First Name</label>
                      <Field
                        label='FirstName'
                        name='FirstName'
                        type='text'
                        placeholder='John Smith'
                        className='block w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-md shadow-sm text-input focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                      />
                      {touched.FirstName && errors.FirstName && (
                        <div>{errors.FirstName}</div>
                      )}
                    </div>
                    <div>
                      <label htmlFor='LastName'>Last Name</label>
                      <Field
                        label='LastName'
                        name='LastName'
                        type='text'
                        placeholder='John Smith'
                        className='block w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-md shadow-sm text-input focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                      />
                      {touched.LastName && errors.LastName && (
                        <div>{errors.LastName}</div>
                      )}
                    </div>
                    <div>
                      <label htmlFor='PhoneNumber'>Phone Number</label>
                      <Field
                        label='PhoneNumber'
                        name='PhoneNumber'
                        type='tel'
                        placeholder='3012328738'
                        className='block w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-md shadow-sm text-input focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                      />
                      {touched.PhoneNumber && errors.PhoneNumber && (
                        <div>{errors.PhoneNumber}</div>
                      )}
                    </div>
                    <div className='mt-6'>
                      <label htmlFor='Email'>Email Address</label>
                      <Field
                        label='Email'
                        name='Email'
                        type='email'
                        placeholder='jane@doe.com'
                        className='block w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-md shadow-sm text-input focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                      />
                      {touched.Email && errors.Email && (
                        <div>{errors.Email}</div>
                      )}
                    </div>
                    <div className='mt-6'>
                      <label htmlFor='Password'>Create Password</label>
                      <Field
                        label='Password'
                        name='Password'
                        type='password'
                        placeholder='Enter your password'
                        className='block w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-md shadow-sm text-input focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                      />
                      {touched.Password && errors.Password && (
                        <div>{errors.Password}</div>
                      )}
                    </div>
                    <div className='mt-6'>
                      <label htmlFor='Role'>Role</label>
                      <Field
                        as='select'
                        name='Role'
                        className='block w-full h-10 px-4 py-2 mt-2 border-2 border-gray-300 rounded-md shadow-sm text-input focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                      >
                        <option value='Canvasser'>Canvasser</option>
                        <option value='Salesman'>Salesman</option>
                        <option value='Admin'>Admin</option>
                      </Field>
                    </div>
                    <button
                      type='submit'
                      className='relative flex justify-center w-full px-4 py-3 my-8 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md group hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400'
                    >
                      Create Account
                    </button>

                    <div className='mt-4 text-center underline'>
                      <Link href='/auth'>
                        <a>Already have an account? Sign in</a>
                      </Link>
                    </div>
                  </Form>
                )}
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
