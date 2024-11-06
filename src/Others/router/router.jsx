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
import LoanTransaction from '../../Components/Pages/Dashboard/Pages/LoanTransaction'
import ManageTransactions from '../../Components/Pages/Dashboard/Pages/ManageTransactions'
import CustomerApplication from '../../Components/Pages/Dashboard/Pages/CustomerApplication'
import CustomerManagement from '../../Components/Pages/Dashboard/Pages/CustomerManagement'
import Reports from '../../Components/Pages/Dashboard/Pages/Reports'
import ReviewTransactions from '../../Components/Pages/Dashboard/Pages/ReviewTransactions'

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
            {
                path: '/dashboard/manage-transaction',
                element: <ManageTransactions />
            },
            {
                path: '/dashboard/review-transaction',
                element: <ReviewTransactions />
            },
            {
                path: '/dashboard/create-new-loan',
                element: <LoanTransaction />
            },
            {
                path: '/dashboard/customer-application',
                element: <CustomerApplication />
            },
            {
                path: '/dashboard/customer-management',
                element: <CustomerManagement />
            },
            {
                path: '/dashboard/reports',
                element: <Reports />
            },
        ]
    }
])

export default router