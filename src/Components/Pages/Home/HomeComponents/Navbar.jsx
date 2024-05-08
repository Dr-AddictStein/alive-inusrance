import React, { useContext, useState } from 'react'
import { NavbarContext } from '../../../../Others/context/NavbarContext';
import logo from '../../../../assets/3f296642258e2f8fb7b0484eb32b92a9.png'
import { Link } from 'react-router-dom';

const Navbar = () => {

    const { instruction, setInstruction, click, setClick } = useContext(NavbarContext);

    return (
        <nav className="flex h-[80px] px-10 items-center justify-between bg-white py-2 textblackwhite">
            <div className="scale-100 rounded-2xl px-3 py-2 text-xl font-semibold text-black transition-all duration-200">
                <Link to='/'>
                    <img src={logo} className='h-10 w-full' alt="" />
                </Link>
            </div>
            <ul className="flex items-center justify-between gap-6 text-slate-900">
                <li className="cursor-pointer hover:text-blue-400  font-semibold rounded-full  px-6 py-2 text-black ">Home</li>
                <li className="cursor-pointer hover:text-blue-400  rounded-full px-6 py-2 text-black ">Products</li>
                <li className="cursor-pointer hover:text-blue-400  rounded-full px-6 py-2 text-black ">Services</li>
                <li className="cursor-pointer hover:text-blue-400  rounded-full px-6 py-2 text-black ">About Us</li>

            </ul>
            <div className='relative'>
                <ul className='flex justify-center items-center gap-10'>
                    <div onClick={() => setClick(!click)} className='flex justify-center items-center gap-1 relative cursor-pointer hover:text-blue-400'>
                        <div>
                            <li className='text-[#1D6FFF]'>Login</li>
                            <div className='absolute border-blue-600 bottom-[-28px] left-0 w-full'>
                                <hr className='border-blue-600 border-[2px]' />
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" stroke='#1D6FFF' viewBox="0 0 20 20" >
                            <path fillRule="evenodd" d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className='bg-[#1D6FFF] px-10 py-2'>
                        <li>Register</li>
                    </div>
                </ul>
                {click && <div className='absolute top-[60px] space-y-2 right-40 py-2 w-[150px] px-2 z-50 font-semibold h-[70px] bg-white text-black'>
                    <h1 onClick={() => {
                        setInstruction('home');
                        setClick(false)
                    }} className='cursor-pointer text-[#1D6FFF]'>Bank</h1>
                    <h1 onClick={() => {
                        setInstruction('customer-login');
                        setClick(false);
                    }} className='cursor-pointer text-[#1D6FFF]'>Customer</h1>
                </div>}
            </div>
        </nav>

    )
}

export default Navbar