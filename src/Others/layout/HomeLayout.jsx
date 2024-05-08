import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../Components/Pages/Home/HomeComponents/Navbar'
import Footer from '../../Components/Pages/Home/HomeComponents/Footer'

const HomeLayout = () => {
    return (
        <div className='font-sans'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default HomeLayout