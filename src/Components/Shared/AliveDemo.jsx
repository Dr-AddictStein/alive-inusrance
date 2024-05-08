import React, { useContext } from 'react'
import { FaFilePdf } from "react-icons/fa6";
import { NavbarContext } from '../../Others/context/NavbarContext';

const AliveDemo = ({ previousStep, setAccess }) => {
    return (
        <div className='mx-auto w-[500px] flex flex-col justify-center items-center'>
            <div className='h-16 w-16 rounded-full bg-blue-500 flex justify-center items-center'>
                <h1 className='text-white text-lg font-bold'>XERO</h1>
            </div>
            <h1><span className='font-bold'>Alive-demo</span> want to acces:</h1>
            <div className='py-5'>
                <h1 className='text-lg font-semibold py-1'>Organization data</h1>
                <div className='flex justify-between items-start gap-10 py-5'>
                    <div className='h-16 w-16'>
                        <FaFilePdf className='w-full h-full' />
                    </div>
                    <div>
                        <h1 className='text-lg font-semibold'>Alive</h1>
                        <p>View and manage your:</p>
                        <ol className='pl-2'>
                            <li>• Organization settings</li>
                            <li>• Attachments</li>
                            <li>• Bussiness transactions</li>
                            <li>• Contacts</li>
                        </ol>
                        <h1>View your:</h1>
                        <ol className='pl-2'>
                            <li>• Reports</li>
                            <li>• Gender ledger</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div>
                <h1 className='text-lg font-semibold py-1'>User account information</h1>
                <div className='flex justify-between items-start gap-10 py-5'>
                    <div className='h-16 w-16'>
                        <FaFilePdf className='w-full h-full' />
                    </div>
                    <div>
                        <h1 className='text-lg font-semibold'>Harish Gupta</h1>
                        <p>View your name, eamil and <br /> user profile.</p>
                    </div>
                </div>
            </div>
            <p>By allowing access, you agree to transfer your data <br /> between Xero and this application in accordance with Xero's <br /> <span className='font-semibold text-blue-500'>Term's and use</span> and the application provider's term's and use <br /> and private policy. <br />Youn can disconnect at any time by going to <span className='text-blue-500 font-semibold'> <br />connected app </span>in your Xero's setting.</p>
            <button onClick={() => setAccess(true)} className='w-[90%] bg-blue-600 text-lg py-2 my-5 rounded-lg text-white'>Allow Access</button>
            <button onClick={previousStep} className=' my-3 text-lg font-semibold rounded-lg text-black'>Cancel</button>
        </div>
    )
}

export default AliveDemo