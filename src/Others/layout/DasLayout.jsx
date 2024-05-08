import React from 'react'
import { Outlet } from 'react-router-dom'
import DasNavbar from '../../Components/Pages/Dashboard/DasNavbar'

const DasLayout = () => {
    return (
        <>
            <DasNavbar />
            <Outlet />
        </>
    )
}

export default DasLayout