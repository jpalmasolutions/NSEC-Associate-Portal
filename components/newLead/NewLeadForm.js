import Link from 'next/link'
import { useRouter } from 'next/router'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { signIn } from 'next-auth/client'
import { useState } from 'react'

const NewLeadForm = () => {
  const [selectedFile, setSelectedFile] = useState()
  return (
    <>
      <div className='flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8'>
        <div className='w-full max-w-xl px-20 border shadow-xl rounded-xl'>
          <h1 className='mt-20 mb-10 text-3xl font-semibold'>
            NSEC - New Lead
          </h1>
          <h3 className='mt-2'>Please fill out the information below</h3>
          <div className='mt-10'>
            <div>
              <Formik
                initialValues={{
                  firstname: '',
                  lastname: '',
                  email: '',
                  phone: '',
                  rating: '',
                  priority: '',
                }}
                validationSchema={Yup.object({
                  firstname: Yup.string()
                    .min(2, 'Too Short!')
                    .max(60, 'Too Long!')
                    .required('Required'),
                  lastname: Yup.string()
                    .min(2, 'Too Short!')
                    .max(60, 'Too Long!')
                    .required('Required'),
                  email: Yup.string().email('Invalid email address'),
                  phone: Yup.string().min(10, 'Too Short!'),
                })}
                onSubmit={async (values) => {
                  // @todo need to check if the user already exists
                  // Then create user
                  console.log(values)
                  console.log(selectedFile)
                  alert('The End')
                  // const result = await signIn('credentials', {
                  //   redirect: 'false',
                  //   email: values.email,
                  //   password: values.password,
                  // })

                  // if (!result.error) {
                  //   router.replace('/new')
                  // }
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div>
                      <label htmlFor='firstname'>First Name</label>
                      <Field
                        label='FirstName'
                        name='firstname'
                        type='text'
                        placeholder='John'
                        className='block w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-md shadow-sm text-input focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                      />
                    </div>
                    <div className='mt-6'>
                      <label htmlFor='lastname'>Last Name</label>
                      <Field
                        label='LastName'
                        name='lastname'
                        type='text'
                        placeholder='Smith'
                        className='block w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-md shadow-sm text-input focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                      />
                    </div>
                    <div className='mt-6'>
                      <label htmlFor='email'>Email Address</label>
                      <Field
                        label='email'
                        name='email'
                        type='email'
                        placeholder='john@gmail.com'
                        className='block w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-md shadow-sm text-input focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                      />
                      {touched.email && errors.email && (
                        <div>{errors.email}</div>
                      )}
                    </div>
                    <div className='mt-6'>
                      <label htmlFor='phone'>Phone Number</label>
                      <Field
                        label='Phone'
                        name='phone'
                        type='text'
                        placeholder='3012709372'
                        className='block w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-md shadow-sm text-input focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                      />
                    </div>
                    <div className='mt-6'>
                      <label htmlFor='rating'>Interest Rating</label>
                      <Field
                        as='select'
                        name='rating'
                        className='block w-full h-10 px-4 py-2 mt-2 border-2 border-gray-300 rounded-md shadow-sm text-input focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                      >
                        <option value='1'>Very Interested</option>
                        <option value='2'>Interested</option>
                        <option value='3'>Somewhat Interested</option>
                        <option value='4'>Not Very Interested</option>
                      </Field>
                    </div>
                    <div className='mt-6'>
                      <label htmlFor='priority'>Priority Ranking</label>
                      <Field
                        as='select'
                        name='priority'
                        className='block w-full h-10 px-4 mt-2 border-2 border-gray-300 rounded-md shadow-sm py-2 text-input focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                      >
                        <option value='1'>High Priority</option>
                        <option value='2'>Medium Priority</option>
                        <option value='3'>Low Priority</option>
                        <option value='4'>No Priority</option>
                      </Field>
                    </div>
                    <div className='mt-6 space-y-4'>
                      <label htmlFor='file'>Upload Image of Pepco Bill</label>
                      <input
                        id='file'
                        name='file'
                        type='file'
                        onChange={(e) => {
                          setSelectedFile(e.target.files[0])
                        }}
                      />
                    </div>
                    <button
                      type='submit'
                      className='relative flex justify-center w-full px-4 py-3 my-8 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md group hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400'
                    >
                      Submit
                    </button>
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

export default NewLeadForm
