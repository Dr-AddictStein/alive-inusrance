import React, { useContext, useState } from 'react'
import logo from '../../../assets/3f296642258e2f8fb7b0484eb32b92a9.png'
import { NavbarContext } from '../../../Others/context/NavbarContext';
import icon1 from '../../../assets/dashboard/account_circle.png'
import icon2 from '../../../assets/dashboard/notifications_unread.png'
import icon3 from '../../../assets/dashboard/contact_support.png'
import { Link } from 'react-router-dom';

const DasNavbar = () => {

    const [click, setClick] = useState('');
    const [clicked, setClicked] = useState(false);

    return (
        <nav className="flex h-[80px] px-10 items-center justify-between bg-[#E8E8E8] py-2 textblackwhite">
            <div className="scale-100 rounded-2xl px-3 py-2 text-xl font-semibold text-black transition-all duration-200 hover:scale-110">
                <Link to='/'>
                    <img src={logo} className='h-10 w-full' alt="" />
                </Link>
            </div>
            <ul className="flex items-center justify-between gap-6 text-slate-900">
                <li onClick={() => setClicked(!clicked)} className="cursor-pointer rounded-full  px-6 py-2">
                    <Link to='/dashboard'>Dashboard</Link>
                </li>
                <div className='relative'>
                    <ul className='flex justify-center items-center gap-10'>
                        <div onClick={() => {
                            setClick('bank-service')
                            setClicked(!clicked)
                        }} className='flex justify-center items-center gap-1 relative cursor-pointer hover:text-blue-400'>
                            <li className=''>Bank Services</li>

                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" stroke='#000000' viewBox="0 0 20 20" >
                                <path fillRule="evenodd" d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </ul>
                    {click === 'bank-service' && clicked && <div className='absolute top-[60px] left-0 space-y-2  py-3 px-5 w-[250px] shadow-2xl z-50 font-semibold bg-white text-blue-400'>
                        <div className='flex flex-col justify-center items-start gap-3'>
                            <Link onClick={() => setClicked(false)} className='cursor-pointer '>Test 1</Link>
                            <Link onClick={() => setClicked(false)} className='cursor-pointer '>Test 2</Link>
                            <Link onClick={() => setClicked(false)} className='cursor-pointer '>Test 3</Link>
                        </div>
                    </div>}
                </div>

                <div className='relative'>
                    <ul className='flex justify-center items-center gap-10'>
                        <div onClick={() => {
                            setClick('erp-intrigartion')
                            setClicked(!clicked)
                        }} className='flex justify-center items-center gap-1 relative cursor-pointer hover:text-blue-400'>
                            <li className=''>ERP Integration</li>

                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" stroke='#000000' viewBox="0 0 20 20" >
                                <path fillRule="evenodd" d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </ul>
                    {click === 'erp-intrigartion' && clicked && <div className='absolute top-[60px] left-0 space-y-2  py-3 px-5 w-[250px] shadow-2xl z-50 font-semibold bg-white text-blue-400'>
                        <div className='flex flex-col justify-center items-start gap-3'>
                            <Link onClick={() => setClicked(false)} to='/dashboard/erp-registration' className='cursor-pointer '>ERP Registration</Link>
                            <Link onClick={() => setClicked(false)} to='/dashboard/erp-connection' className='cursor-pointer '>Manage ERP Connections</Link>
                            <Link onClick={() => setClicked(false)} to='/dashboard/erp-help' className='cursor-pointer '>Help</Link>
                        </div>
                    </div>}
                </div>
                <div className='relative'>
                    <ul className='flex justify-center items-center gap-10'>
                        <div onClick={() => {
                            setClick('erp-customers')
                            setClicked(!clicked)
                        }} className='flex justify-center items-center gap-1 relative cursor-pointer hover:text-blue-400'>
                            <li className=''>ERP Customers</li>

                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" stroke='#000000' viewBox="0 0 20 20" >
                                <path fillRule="evenodd" d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </ul>
                    {click === 'erp-customers' && clicked && <div className='absolute top-[60px] left-0 space-y-2  py-3 px-5 w-[250px] shadow-2xl z-50 font-semibold bg-white text-blue-400'>
                        <div className='flex flex-col justify-center items-start gap-3'>
                            <Link onClick={() => setClicked(false)} to='/dashboard/customer-application' className='cursor-pointer '>Customer Application</Link>
                            <Link onClick={() => setClicked(false)} to='/dashboard/customer-management' className='cursor-pointer '>Customer Management</Link>
                            <Link onClick={() => setClicked(false)} to='/dashboard/reports' className='cursor-pointer '>Reports</Link>
                        </div>
                    </div>}
                </div>

                <div className='relative'>
                    <ul className='flex justify-center items-center gap-10'>
                        <div onClick={() => {
                            setClick('transactions')
                            setClicked(!clicked)
                        }} className='flex justify-center items-center gap-1 relative cursor-pointer hover:text-blue-400'>
                            <li className=''>Transactions</li>

                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" stroke='#000000' viewBox="0 0 20 20" >
                                <path fillRule="evenodd" d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </ul>
                    {click === 'transactions' && clicked && <div className='absolute top-[60px] left-0 space-y-2  py-3 px-5 w-[250px] shadow-2xl z-50 font-semibold bg-white text-blue-400'>
                        <div className='flex flex-col justify-center items-start gap-3'>
                            <Link onClick={() => setClicked(false)} to='/dashboard/review-transaction' className='cursor-pointer '>Review Transaction</Link>
                            <Link onClick={() => setClicked(false)} className='cursor-pointer '>Manage Transactions</Link>
                            <Link onClick={() => setClicked(false)} className='cursor-pointer '>Help</Link>
                        </div>
                    </div>}
                </div>

                <div className='relative'>
                    <ul className='flex justify-center items-center gap-10'>
                        <div onClick={() => {
                            setClick('administration')
                            setClicked(!clicked)
                        }} className='flex justify-center items-center gap-1 relative cursor-pointer hover:text-blue-400'>
                            <li className=''>Administration</li>

                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" stroke='#000000' viewBox="0 0 20 20" >
                                <path fillRule="evenodd" d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </ul>
                    {click === 'administration' && clicked && <div className='absolute top-[60px] left-0 space-y-2  py-3 px-5 w-[250px] shadow-2xl z-50 font-semibold bg-white text-blue-400'>
                        <div className='flex flex-col justify-center items-start gap-3'>
                            <Link onClick={() => setClicked(false)} className='cursor-pointer '>Test 1</Link>
                            <Link onClick={() => setClicked(false)} className='cursor-pointer '>Test 2</Link>
                            <Link onClick={() => setClicked(false)} className='cursor-pointer '>Test 3</Link>
                        </div>
                    </div>}
                </div>

            </ul>
            <div>
                <ul className='flex justify-center items-center gap-4'>
                    <li>
                        <Link>
                            <img src={icon3} alt="" className='h-6 w-6 cursor-pointer' />
                        </Link>
                    </li>
                    <li>

                        <Link>
                            <img src={icon2} alt="" className='h-6 w-6 cursor-pointer' />
                        </Link>
                    </li>
                    <li>
                        <Link>
                            <img src={icon1} alt="" className='h-6 w-6 cursor-pointer' />
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>

    )
}

export default DasNavbar