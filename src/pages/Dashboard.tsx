import React from 'react'
import CardLayout from '../components/CardLayout'

const Dashboard = () => {
    return <div className='dark:text-white h-full grow'>Dashboard
        <div className='flex flex-col items-center justify-center h-full gap-8 p-8'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-8 h-full w-full'>
                <CardLayout title={"Total Pool Balance (USD)" }description={"$15,012"}>
                    <img src='1.png' alt='' />
                </CardLayout>
                <CardLayout title={"Current Exposure" }description={"25%"}>
                    <img src='2.png' alt='' />
                </CardLayout>
                <CardLayout title={"Total Bets Placed (USD)" }description={"$1,013"}>
                    <img src='3.png' alt='' />
                </CardLayout>
                <CardLayout title={"Profit and Loss" }description={"+1.5%"}>
                    <img src='4.png' alt='' />
                </CardLayout>
            </div>
            <div className='bg-white rounded-lg h-[45vh] w-full'>

            </div>
        </div>
    </div>
}

export default Dashboard
