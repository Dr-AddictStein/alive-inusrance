import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import HomeLayout from '../layout/HomeLayout'
import DasLayout from '../layout/DasLayout'
import Home from '../../Components/Pages/Home/Home'
import DasHome from '../../Components/Pages/Dashboard/Pages/Home'
import ErpRegistration from '../../Components/Pages/Dashboard/Pages/ErpRegistration'
import ErpCOnnection from '../../Components/Pages/Dashboard/Pages/ErpCOnnection'
import ErpHelp from '../../Components/Pages/Dashboard/Pages/ErpHelp'
import CreateNewTransaction from '../../Components/Pages/Dashboard/Pages/CreateNewTransaction'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DasLayout />,
        children: [
            {
                path: '/dashboard',
                element: <DasHome />
            },
            {
                path: '/dashboard/erp-registration',
                element: <ErpRegistration />
            },
            {
                path: '/dashboard/erp-connection',
                element: <ErpCOnnection />
            },
            {
                path: '/dashboard/erp-help',
                element: <ErpHelp />
            },
            {
                path: '/dashboard/create-new-transaction',
                element: <CreateNewTransaction />
            },
        ]
    }
])

export default router