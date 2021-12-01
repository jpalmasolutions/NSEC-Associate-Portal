import Link from 'next/link'

const Footer = () => {
  return (
    <div className='grid py-10 align-middle bg-customblack justify-items-center'>
      <a href='/new' target='_blank'>
        <p className='pb-10 text-center text-white'>
          &copy; {new Date().getFullYear()} JPalma
        </p>
      </a>
    </div>
  )
}

export default Footer
