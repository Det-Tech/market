import React from 'react'
import CardLayout from '../components/CardLayout'
import card1 from '../assets/1.png'
import card2 from '../assets/2.png'
import card3 from '../assets/3.png'
import card4 from '../assets/4.png'

const Dashboard = () => {
    return <div className='dark:text-white h-full grow'>Dashboard
        <div className='flex flex-col items-center justify-center h-full gap-8 p-8'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-8 h-full w-full'>
                <CardLayout title={"Total Pool Balance (USD)" }description={"$15,012"}>
                    <img src={card1} alt='' />
                </CardLayout>
                <CardLayout title={"Current Exposure" }description={"25%"}>
                    <img src={card2} alt='' />
                </CardLayout>
                <CardLayout title={"Total Bets Placed (USD)" }description={"$1,013"}>
                    <img src={card3} alt='' />
                </CardLayout>
                <CardLayout title={"Profit and Loss" }description={"+1.5%"}>
                    <img src={card4} alt='' />
                </CardLayout>
            </div>
            <div className='bg-white rounded-lg h-[45vh] w-full'>

            </div>
        </div>
    </div>
}

export default Dashboard
