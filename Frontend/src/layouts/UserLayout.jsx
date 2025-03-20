import React from 'react'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import MyNavbar from '../components/MyNavbar'

function UserLayout() {
    return (
        <div className='flex flex-col h-screen '>
            <MyNavbar />

            <div className=' flex-grow pt-16 lg:pt-14'>
                {/* <div className='flex-1 items-start'> */}
                <Outlet />
            </div>
            <Footer />

        </div>
    )
}

export default UserLayout
