import { IoIosCheckmarkCircle } from 'react-icons/io'

const AllowAccess = () => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-lg font-semibold'>Allow access</h1>
            <hr className='my-4 border-gray-400 border w-full' />
            <IoIosCheckmarkCircle className='h-10 w-10 text-green-700' />
        </div>
    )
}

export default AllowAccess