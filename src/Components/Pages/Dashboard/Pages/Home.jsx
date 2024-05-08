import React from 'react'
import DasNavbar from '../DasNavbar'
import Navbar from '../../Home/HomeComponents/Navbar'

const DasHome = () => {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 pt-10 px-10">
                <div className='space-y-2 text-lg font-sans'>
                    <h1>Calender</h1>
                    <div className="h-64 rounded-lg bg-gray-200"></div>
                </div>
                <div className='space-y-2 text-lg font-sans'>
                    <h1>Transaction Summary</h1>
                    <div className="h-64 rounded-lg bg-gray-200"></div>
                </div>
                <div className='space-y-2 text-lg font-sans'>
                    <h1>Customers ERP Summary</h1>
                    <div className="h-64 rounded-lg bg-gray-200"></div>
                </div>
            </div>
            <div className='space-y-2 text-lg font-sans px-10 pt-10'>
                <h1>Alerts</h1>
                <div className="h-52 rounded-lg bg-gray-200"></div>
            </div>
        </>
    )
}

export default DasHome