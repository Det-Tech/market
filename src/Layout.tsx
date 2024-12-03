import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

const Layout = ({ children }) => {
    return (
        <>
            <div className='flex flex-auto min-h-screen'>
                <Sidebar />
                <div className='grow bg-[#f6f6f6]'>
                    <Navbar />
                    <div className='m-5'>{children}</div>
                </div>
            </div>
        </>
    )
}

export default Layout
