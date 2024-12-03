import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import HamburgerButton from './HamburgerMenuButton/HamburgerButton'

const Sidebar = () => {
  const [open, setOpen] = useState(true)
  const [mobileMenu, setMobileMenu] = useState(false)
  const location = useLocation()

  const Menus = [
    { title: 'Dashboard', path: '/dashboard', src: "./assets/dashboard.svg" },
    { title: 'Liquidity Pool', path: '/liquidity', src: "./assets/liquidity.svg" },
    { title: 'Profit and Loss', path: '/profit', src: "./assets/profit.svg" },
    { title: 'Data Oracles', path: '/oracle', src: "./assets/oracle.svg" },
  ]

  return (
    <>
      <div
        className={`${
          open ? 'w-[300px]' : 'w-fit'
        } pt-[60px]  hidden sm:block relative min-h-screen duration-300 bg-[#1c1e26] border-r border-gray-200 dark:border-gray-600 p-5 dark:bg-slate-800`}
      >
        {/* <BsArrowLeftCircle
          className={`${
            !open && 'rotate-180'
          } absolute text-3xl bg-white fill-slate-800  rounded-full cursor-pointer top-9 -right-4 dark:fill-gray-400 dark:bg-gray-800`}
          onClick={() => setOpen(!open)}
        /> */}
        {/* <Link to='/'>
          <div className={`flex ${open && 'gap-x-4'} items-center`}>
            <img src={Logo} alt='' className='pl-2' />
            {open && (
              <span className='text-xl font-medium whitespace-nowrap dark:text-white'>
                Goal Quest
              </span>
            )}
          </div>
        </Link> */}

        <ul className='pt-6'>
          {Menus.map((menu: any, index) => (
            <Link to={menu.path} key={index}>
              <li
                className={`flex items-center gap-x-6 my-[30px] mx-0 p-3 text-white text-[18px] font-normal font-semibold rounded-lg cursor-pointer dark:text-white hover:bg-[rgba(145,145,145,0.14)] dark:hover:bg-gray-700
                        ${menu.gap ? 'mt-9' : 'mt-2'} ${
                  location.pathname === menu.path &&
                  'bg-[rgba(145,145,145,0.14)] dark:bg-gray-700'
                }`}
                style={{fontFamily: "Poppins, sans-serif"}}
              >
                <img className="grid-01" src={menu.src} />
                <span
                  className={`${
                    !open && 'hidden'
                  } origin-left duration-300 hover:block`}
                >
                  {menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      
      {/* Mobile Menu */}
      <div className="pt-3">
        <HamburgerButton
          setMobileMenu={setMobileMenu}
          mobileMenu={mobileMenu}
        />
      </div>
      <div className="sm:hidden">
        <div
          className={`${
            mobileMenu ? 'flex' : 'hidden'
          } absolute z-50 flex-col items-center self-end py-8 mt-16 space-y-6 font-bold sm:w-auto left-6 right-6 dark:text-white  bg-gray-50 dark:bg-slate-800 drop-shadow md rounded-xl`}
        >
          {Menus.map((menu, index) => (
            <Link
              to={menu.path}
              key={index}
              onClick={() => setMobileMenu(false)}
            >
              <span
                className={` ${
                  location.pathname === menu.path &&
                  'bg-gray-200 dark:bg-gray-700'
                } p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700`}
              >
                {menu.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Sidebar
