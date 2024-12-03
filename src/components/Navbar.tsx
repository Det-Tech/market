import React from 'react'
import Toggle from './ThemeToggle'
import { useAccount, useEnsName } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import bell from '../assets/bell-020.svg'
import down from '../assets/chevron-down0.svg'

const Navbar = () => {
  const { address } = useAccount()
  const { data, error, status } = useEnsName({ address })

  return (
    <nav className='bg-white h-[110px]  border-gray-200 px-2 py-2.5 rounded dark:bg-gray-800'>
      <div className='container flex justify-between items-center mx-auto pt-6'>
        <div className='flex items-center mx-auto'>
          <span className='text-xl font-medium whitespace-nowrap dark:text-white'>
            {/* Welcome */}
          </span>
        </div>

        <div className='flex justify-end pr-4'>
   
          <div className="navbar-alert-block">
            <div className="circle"></div>
            <img className="navbar-bell" src={bell} />
          </div>

          <div className="navbar-alert-block">
            <div className="circle"></div>
            <span className="navbar-bell" >MW</span>
          </div>


          <div className="navbar-profile">

            <div className="navbar-profile-name">Michael Ward </div>
            <img className="chevron-down" src={down} />
          </div>
          
          <ConnectButton/>

          {/* <Toggle /> */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
