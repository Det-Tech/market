import React, { useState, useEffect } from "react";
import { Modal } from "../components/Modal";
import Checkbox from "../components/Checkbox";

import TabButton from "../components/TabButton";

import CanvasJSReact from '@canvasjs/react-charts';
 
import { writeContract, readContract, waitForTransactionReceipt, getTransactionReceipt, waitForTransaction } from '@wagmi/core';
import { factoryAbi, poolAbi } from "./../web3/abi";
import { config, wagmiConfig} from "./../wagmiConfig";
import toast from "react-hot-toast";
import { useAccount, useChainId,  } from 'wagmi'
import {
  http,
  type Address,
  type Hash,
  type TransactionReceipt,
  createPublicClient,
  createWalletClient,
  custom,
  parseEther,
  stringify,
  webSocket
} from 'viem'

import { sepolia } from 'viem/chains'

// wss://sepolia.infura.io/ws/v3/2ab0947ce26c439189703cae9c1814ac

// const publicClient = createPublicClient({
//   chain: sepolia,
//   transport: http(),
// })

const publicClient = createPublicClient({
  chain: sepolia, 
  transport: webSocket('wss://sepolia.infura.io/ws/v3/2ab0947ce26c439189703cae9c1814ac'), 
})


const FACTORYCONTRACT = "0x0FA3AfeC1d2DdcFb587e9d15A7433DeA54441132"
const tokenAddress = "0x9Ca28D22D474BfB5d57Cf5d1A1798693bC3974A9"

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const options = {
  animationEnabled: true,
  theme: "light2",
  title:{
    text: ""
  },
  axisX: {
  },
  axisY: {
  },
  toolTip: {
    shared: true
  },
  legend:{
    cursor: "pointer",
    // itemclick: this.toggleDataSeries
  },
  data: [
    {
      type: "stackedColumn",
      name: "NBA",
      showInLegend: "true",
      dataPoints: [
        {  label:" ", x: 10, y: 171 },
        {  label:" ", x: 20, y: 155},
        {  label:" ", x: 30, y: 150 },
        {  label:" ", x: 40, y: 165 },
        {  label:" ", x: 50, y: 195 },
        {  label:" ", x: 60, y: 168 },
        {  label:" ", x: 70, y: 128 },
        {  label:" ", x: 80, y: 134 },
        {  label:" ", x: 90, y: 114}
      ]
    },
    {
      type: "stackedColumn",
      name: "NFL",
      showInLegend: "true",
      dataPoints: [
        {  label:" ", x: 10, y: 171 },
        {  label:" ", x: 20, y: 155},
        {  label:" ", x: 30, y: 150 },
        {  label:" ", x: 40, y: 165 },
        {  label:" ", x: 50, y: 195 },
        {  label:" ", x: 60, y: 168 },
        {  label:" ", x: 70, y: 128 },
        {  label:" ", x: 80, y: 134 },
        {  label:" ", x: 90, y: 114}
      ]
    },
    {
      type: "stackedColumn",
      name: "NHL",
      showInLegend: "true",
      dataPoints: [
        {  label:" ", x: 10, y: 171 },
        {  label:" ", x: 20, y: 155},
        {  label:" ", x: 30, y: 150 },
        {  label:" ", x: 40, y: 165 },
        {  label:" ", x: 50, y: 195 },
        {  label:" ", x: 60, y: 168 },
        {  label:" ", x: 70, y: 128 },
        {  label:" ", x: 80, y: 134 },
        {  label:" ", x: 90, y: 114}
      ]
    },
 ]
}

const Liquidity = () => {
  // const { address } = useAccount()
  const { address: account } = useAccount(); // Get the user's account address
  const chainId = useChainId();

  const [showPoolList, setShowPoolList] = useState(false);
  const [allPools, setAllPools] = useState([]);

  const [liquidityModalVisible1, setLiquidityModalVisible1] = useState(false);
  const [liquidityModalVisible2, setLiquidityModalVisible2] = useState(false);
  const [liquidityModalVisible3, setLiquidityModalVisible3] = useState(false);

  const [selectedPool, setSelectedPool] = useState(false);
  const [selectedPoolData, setSelectedPoolData] = useState({});

  const [poolName, setPoolName] = useState("");
  const [poolSize, setPoolSize] = useState(0);
  const [initFund, setInitFund] = useState(0);

  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  

  const [nbaChecked, setNbaChecked] = useState(false);
  const [nhlChecked, setNhlChecked] = useState(false);
  const [nflChecked, setNflChecked] = useState(false);

  const [sameParlayChecked, setSameParlayChecked] = useState(false);
  const [propsChecked, setPropsChecked] = useState(false);
  const [othersChecked, setOthersChecked] = useState(false);

  const [maximumPerEvent, setMaximumPerEvent] = useState(0);
  const [maximumPerUser, setMaximumPerUser] = useState(0);
  const [maximumPerCategory, setMaximumPerCategory] = useState(0);


  const steps1 = ['Pool Details', '', ''];
  const steps2 = ['', 'Sports & Bet Type', ''];
  const steps3 = ['', '', 'Risk Parameters'];


  async function fetchPoolDetails() {
    console.log("chainId ", chainId)
    const poolDetailsArray: any = await readContract(wagmiConfig, {
      abi: factoryAbi,
      address: FACTORYCONTRACT,
      functionName: 'getPools',
      chainId: 11155111
    })
    console.log("details ",poolDetailsArray)
     
    
    const poolsJson = poolDetailsArray.map(pool => ({
        poolAddress: pool.poolAddress,
        name: pool.name, 
        size: pool.size,
        initialFundingAmount: pool.initialFundingAmount,
        supportedLeagues: pool.supportedLeagues,
        betTypes: pool.betTypes,
        maxExposurePerEvent: pool.maxExposurePerEvent,
        maxExposurePerUser: pool.maxExposurePerUser,
        maxExposureCategories: pool.betCategories,
        admins: pool.admins
    }));

    setAllPools(poolsJson)

    console.log(poolsJson);
  }

  const showToast = () =>{
    toast('Reduce exposure for NFL bets', {
      duration: 4000,
      position: 'bottom-right',
    
      // Styling
      style: {},
      className: '',
    
      // Custom Icon
      icon: '👏',
    
      // Change colors of success/error/loading icon
      iconTheme: {
        primary: '#000',
        secondary: '#fff',
      },
    
      // Aria
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });
    toast('Bet #125 placed on NBA, $200 wagered', {
      duration: 4000,
      position: 'bottom-right',
    
      // Styling
      style: {},
      className: '',
    
      // Custom Icon
      icon: '👏',
    
      // Change colors of success/error/loading icon
      iconTheme: {
        primary: '#000',
        secondary: '#fff',
      },
    
      // Aria
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });
  }

  useEffect(()=>{
    console.log("address ", account)
    showToast()
    fetchPoolDetails()
  }, [])

  // setInterval(() =>{
  //   fetchPoolDetails()
  // }, 5000)
    
  const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const createPool = async () => {
    const tt = toast.loading("Creating Pool ...");
    try{
      const supportedSports = []
      if(nbaChecked){
        supportedSports.push("NBA")
      }

      if(nhlChecked){
        supportedSports.push("NHL")
      }

      if(nflChecked){
        supportedSports.push("NFL")
      }
      
      const betTypes = []

      if(sameParlayChecked){
        betTypes.push("Same-Game-Parlay")
      }

      if(propsChecked){
        betTypes.push("Player-Props")
      }

      if(othersChecked){
        betTypes.push("Others")
      }

      const args = [
        tokenAddress,   // token contracts
        poolName,
        poolSize,
        initFund,

        supportedSports,
        betTypes,

        maximumPerEvent,
        maximumPerUser,
        maximumPerCategory,
        
        ["0x2f3675Be2999325826e05C8c2178a615d756748d"] // admins
      ]
      console.log("args ", args)

      const tx = await writeContract(config, {
        abi:factoryAbi,
        account,
        chain: sepolia,
        address: FACTORYCONTRACT,
        functionName: 'createPool',
        args: args,
        chainId: 11155111
      })


      console.log(tx)

      // await waitForTransactionReceipt(wagmiConfig, { hash: tx, timeout: 60000 });
      // console.log()
      await publicClient.waitForTransactionReceipt({hash: tx})
      console.log(tx)

      toast.success("Created successfully", { id: tt, duration: 3000});

    }catch(err){
      console.log("createPool ", err)
      toast.error("Creating Fail", { id: tt });
    }
  }

  const getAllowance = async () => {

      const poolAddress = (selectedPoolData as any).poolAddress;
      const allowance = await readContract(config, {
          abi: [
            {
              "constant": true,
              "inputs": [
                  { "name": "owner", "type": "address" },
                  { "name": "spender", "type": "address" }
              ],
              "name": "allowance",
              "outputs": [{ "name": "", "type": "uint256" }],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          }
          ],
          address: tokenAddress,
          functionName: 'allowance',
          args: [account, poolAddress], // Owner is the user's address, spender is the staking contract address
          chainId: 11155111
      });

      console.log("allowance ", allowance)
      return allowance
  }

  const depositHandle = async () => {
    const tt = toast.loading("Depositing ...");

    try {
      console.log(selectedPoolData)

      const poolAddress = (selectedPoolData as any).poolAddress;
      console.log("pool contract ", poolAddress)
      const args = [depositAmount.toString()]; // Ensure this matches the expected parameter type //1000000000000000000000
      
      const allowance = await getAllowance();
      if(allowance < depositAmount) {
          const depositAmountBigInt: any = depositAmount.toString(); // Convert to bigint

          const approvalTx = await writeContract(config, {
            abi: [
              {
                constant: false,
                inputs: [
                  { name: "spender", type: "address" },
                  { name: "value", type: "uint256" },
                ],
                name: "approve",
                outputs: [{ name: "", type: "bool" }],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
              },
            ] as const, // Mark as readonly
            account, // Include the user's account address
            address: tokenAddress, // ERC20 token contract address
            functionName: 'approve',
            chain: sepolia,
            args: [poolAddress, depositAmountBigInt], // Approve the staking contract to spend your tokens
          });

          await publicClient.waitForTransactionReceipt({hash: approvalTx})

        // const transactionReceipt = await waitForTransaction(config, { hash: approvalTx, timeout: 60000, chainId: 11155111 });

        console.log("approvalTx ", approvalTx)
      } else {
        console.log("already have engouh allowance")
      }


      const tx = await writeContract(config, {
        abi:poolAbi,
        account,
        chain: sepolia,
        address: poolAddress,
        functionName: 'stake',
        args: args,
      })

      console.log(tx)

      const res = await publicClient.waitForTransactionReceipt({hash: tx})
      // const res = await waitForTransactionReceipt(config, { hash: tx, timeout: 60000 });
      console.log("success tx ", res)
      toast.success("Deposited successfully", { id: tt, duration: 3000});

    }catch(err){
      console.log("deposit err ", err)
      toast.error("Depositing Fail", { id: tt });

    }
  }

  const withdrawHandle = async () => {
    const tt = toast.loading("Withdrawing ...");

     try {
      
      const args = [withdrawAmount.toString()]; // Ensure this matches the expected parameter type //1000000000000000000000
      const poolAddress = (selectedPoolData as any).poolAddress;
      const tx = await writeContract(config, {
        abi: poolAbi,
        account,
        chain: sepolia,
        address: poolAddress,
        functionName: 'withdraw',
        args: args,
      })

      const res = await publicClient.waitForTransactionReceipt({hash: tx})
      // const res = await waitForTransactionReceipt(config, { hash: tx, timeout: 60000 });

      console.log("success withdraw", res)
      toast.success("Withdraw successfully", { id: tt, duration:3000});

    }catch(err){
      toast.error("Withdrawing Fail", { id: tt });

    }
  } 

  return <div className='dark:text-white'>Liquidity

    {liquidityModalVisible1 && <Modal onClose={() => setLiquidityModalVisible1(false)}>
      <div className="flex flex-col items-center justify-center gap-8 text-black w-[450px] p-12">
        <h1 className="font-bold text-xl">Pool Creation Wizard</h1>
        <div className="flex justify-center mb-8">
          {steps1.map((step, index) => (
            <div
              key={index}
              className={`flex items-center ${index === 0
                ? 'text-[#4285F4] font-medium'
                : 'text-gray-500 font-normal'
                }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${index === 0
                  ? 'text-[#4285F4] border-[#4285F4] border'
                  : 'bg-gray-200 text-gray-500'
                  }`}
              >
                {index + 1}
              </div>
              <span>{step}</span>
              {index !== steps1.length - 1 && (
                <div className="w-4 h-1 bg-gray-200 mx-4"></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start justify-center w-full">
          <h1>Pool Name</h1>
          <input type="text" onChange={(e)=>setPoolName(e.target.value)} className="rounded-full w-full bg-gray-100 py-2 px-4 focus:outline-none focus:bg-gray-200" />
        </div>
        <div className="w-full">
          <label htmlFor="poolSize" className="block mb-2">
            Pool Size
          </label>
          <input
            type="range"
            id="poolSize"
            min="2"
            max="100"
            className="w-full"
            value={poolSize}
            onChange={(e:any)=>{setPoolSize(e.target.value)}}
          />
          <span className="text-gray-500">{poolSize}</span>
        </div>
        <div className="w-full">
          <label htmlFor="initialFundingAmount" className="block mb-2">
            Initial Funding Amount (USD)
          </label>
          <input type="text" value = {initFund} className="rounded-full w-full bg-gray-100 py-2 px-4 focus:outline-none focus:bg-gray-200" onChange={(e: any)=>{setInitFund(e.target.value)}}/>
        </div>
        <div className="flex flex-row w-full justify-end">
          <button onClick={() => { setLiquidityModalVisible1(false); setLiquidityModalVisible2(true) }} className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-6 rounded-full flex flex-row items-center justify-center gap-2">
            <h1>Next</h1>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </Modal>}
    {liquidityModalVisible2 && <Modal onClose={() => setLiquidityModalVisible2(false)}>
      <div className="flex flex-col items-center justify-center gap-8 text-black w-[450px] p-12">
        <h1 className="font-bold text-xl">Pool Creation Wizard</h1>
        <div className="flex justify-center mb-8">
          {steps2.map((step, index) => (
            <div
              key={index}
              className={`flex items-center ${index <= 1
                ? 'text-[#4285F4] font-medium'
                : 'text-gray-500 font-normal'
                }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${index <= 1
                  ? 'text-[#4285F4] border-[#4285F4] border'
                  : 'bg-gray-200 text-gray-500'
                  }`}
              >
                {index + 1}
              </div>
              <span>{step}</span>
              {index !== steps2.length - 1 && (
                <div className={`w-4 h-1 mx-4 ${index < 1 ? "bg-blue-500" : "bg-gray-200 "}`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start justify-center w-full">
          <h1 className="text-gray-500">Supported  Sports Leagues</h1>
          <div className="flex flex-row items-center justify-center gap-4 mt-4">
            <Checkbox label="NBA" checked={nbaChecked} onChange={()=>setNbaChecked(!nbaChecked)} />
            <Checkbox label="NHL" checked={nhlChecked} onChange={()=>setNhlChecked(!nhlChecked)} />
            <Checkbox label="NFL" checked={nflChecked} onChange={()=>setNflChecked(!nflChecked)}/>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center w-full">
          <h1 className="text-gray-500">Bet Types</h1>
          <div className="flex flex-row items-center justify-center gap-4 mt-4">
            <Checkbox label="Same-Game Parlay" checked={sameParlayChecked} onChange={()=>setSameParlayChecked(!sameParlayChecked)}/>
            <Checkbox label="Player Props" checked={propsChecked} onChange={()=>setPropsChecked(!propsChecked)}/>
          </div>
          <Checkbox label="Others" checked={othersChecked} onChange={()=>setOthersChecked(!othersChecked)} />
        </div>
        <div className="flex flex-row w-full justify-between">
          <button onClick={() => { setLiquidityModalVisible2(false); setLiquidityModalVisible1(true) }} className="bg-gray-800 hover:bg-gray-500 text-white font-medium py-2 px-6 rounded-full flex flex-row items-center justify-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h1>Back</h1>
          </button>
          <button onClick={() => { setLiquidityModalVisible2(false); setLiquidityModalVisible3(true) }} className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-6 rounded-full flex flex-row items-center justify-center gap-2">
            <h1>Next</h1>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </Modal>}
    {liquidityModalVisible3 && <Modal onClose={() => setLiquidityModalVisible3(false)}>
      <div className="flex flex-col items-center justify-center gap-8 text-black w-[450px] p-12">
        <h1 className="font-bold text-xl">Pool Creation Wizard</h1>
        <div className="flex justify-center mb-8">
          {steps3.map((step, index) => (
            <div
              key={index}
              className={`flex items-center ${index <= 2
                ? 'text-[#4285F4] font-medium'
                : 'text-gray-500 font-normal'
                }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${index <= 2
                  ? 'text-[#4285F4] border-[#4285F4] border'
                  : 'bg-gray-200 text-gray-500'
                  }`}
              >
                {index + 1}
              </div>
              <span>{step}</span>
              {index !== steps3.length - 1 && (
                <div className={`w-4 h-1 mx-4 ${index < 2 ? "bg-blue-500" : "bg-gray-200 "}`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="w-full">
          <h1 className="block mb-2">
            Maximum Exposure (per Event)
          </h1>
          <input
            type="range"
            id="poolSize"
            min="2"
            max="100"
            className="w-full"
            value={maximumPerEvent}
            onChange={(e: any)=>setMaximumPerEvent(e.target.value)}
          />
          <span className="text-gray-500">{maximumPerEvent}</span>
        </div>
        <div className="w-full">
          <h1 className="block mb-2">
            Maximum Exposure (per User)
          </h1>
          <input
            type="range"
            id="poolSize"
            min="2"
            max="100"
            className="w-full"
            value={maximumPerUser}
            onChange={(e: any)=>setMaximumPerUser(e.target.value)}
          />
          <span className="text-gray-500">{maximumPerUser}</span>
        </div>
        <div className="w-full">
          <h1 className="block mb-2">
            Maximum Exposure (per Bet Category)
          </h1>
          <input
            type="range"
            min="2"
            max="100"
            className="w-full"
            value={maximumPerCategory}
            onChange={(e: any)=>setMaximumPerCategory(e.target.value)}
          />
          <span className="text-gray-500">{maximumPerCategory}</span>
        </div>
        <div className="flex flex-row w-full justify-between">
          <button onClick={() => { setLiquidityModalVisible3(false); setLiquidityModalVisible2(true) }} className="bg-gray-800 hover:bg-gray-500 text-white font-medium py-2 px-6 rounded-full flex flex-row items-center justify-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h1>Back</h1>
          </button>
          <button onClick={() => { createPool(); 
          setLiquidityModalVisible3(false); 
          }} className="bg-gray-800 hover:bg-gray-500 text-white font-medium py-2 px-6 rounded-full flex flex-row items-center justify-center gap-2">
            <h1>Finish</h1>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.6666 5L7.49992 14.1667L3.33325 10" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </Modal>}
    <div className="">
      <div className="flex flex-row items-center justify-end gap-4">
        <div className="flex flex-row items-center justify-center bg-white rounded-full px-6 py-4 cursor-pointer">
          <p>Nov 21 - Nov 25, 2024</p>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="black" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <button onClick={() => setLiquidityModalVisible1(true)} className="text-white bg-black py-4 px-6 rounded-full hover:bg-gray-800">Add Liquidity +</button>
        <button onClick={() => setShowPoolList(!showPoolList)} className="text-white bg-black py-4 px-6 rounded-full hover:bg-gray-800">Show All Liquidity</button>
      </div>
      {!showPoolList&&
      <div className="bg-white rounded-xl w-full h-full min-h-[70vh] flex flex-col items-center justify-center p-12 mt-4">
        <div className="flex flex-row items-start justify-between w-full">
          <div className="flex flex-col items-start justify-start gap-2">
            <h1 className="text-[#666666]">Current Pool Exposure</h1>
            <h1 className="font-bold text-5xl">25%</h1>
            <p className="text-sm text-[#666666] mt-2">1500</p>
          </div>
          <div className="flex flex-row bg-gray-200 rounded-full">
            <TabButton label={"By Sport"} isActive={true} />
            <TabButton label={"By Bet Type"} isActive={false} />
          </div>

          {/* <img src="2.png" alt="" /> */}

          
          <div className="progress-bar-risk-container">
            <div className="progress-bar-risk-container-wraper">
              <div className="progress1"></div>
              <div className="progress2"></div>
              <div className="progress3"></div>
              <div className="progress4"></div>
              <div className="progress5"></div>
              {/* <div className="rectangle-18803"></div>
              <div className="rectangle-18804"></div>
              <div className="rectangle-18805"></div>
              <div className="rectangle-18806"></div> */} 
              <div className="risk-meter">Risk Meter </div>
            </div>
          </div>
          
        </div>
        <div className="p-8 w-full">
        <CanvasJSChart options = {options}
				// onRef={ref => this.chart = ref}
			/>
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row items-center justify-center w-[65%] gap-4">
            <div className="w-full">
              <h1 className="block mb-2">
                Maximum Exposure (per Event)
              </h1>
              <input
                type="range"
                id="poolSize"
                min="0"
                max="100"
                className="w-full"
              />
              <span className="text-gray-500">{2}</span>
            </div>
            <div className="w-full">
              <h1 className="block mb-2">
                Maximum Exposure (per User)
              </h1>
              <input
                type="range"
                id="poolSize"
                min="2"
                max="100"
                className="w-full"
              />
              <span className="text-gray-500">{2}</span>
            </div>
            <div className="w-full">
              <h1 className="block mb-2">
                Maximum Exposure (per Bet Category)
              </h1>
              <input
                type="range"
                min="2"
                max="100"
                className="w-full"
              />
              <span className="text-gray-500">{2}</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-end gap-4 w-[30%]">
            {/* <div className="flex flex-row items-center justify-center gap-4 rounded-xl bg-[#007AFF0D] px-4 py-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33342 11.6654L4.64562 16.9142C4.68252 17.0618 4.70098 17.1356 4.72281 17.2001C4.93605 17.8296 5.50301 18.2723 6.16552 18.3265C6.23333 18.332 6.30941 18.332 6.46157 18.332C6.65211 18.332 6.74739 18.332 6.82764 18.3243C7.62091 18.2473 8.24869 17.6195 8.32563 16.8263C8.33342 16.746 8.33342 16.6507 8.33342 16.4602V4.58204M15.4167 11.2487C17.0276 11.2487 18.3334 9.94287 18.3334 8.33204C18.3334 6.72121 17.0276 5.41537 15.4167 5.41537M8.54175 4.58204H5.41675C3.34568 4.58204 1.66675 6.26097 1.66675 8.33204C1.66675 10.4031 3.34568 12.082 5.41675 12.082H8.54175C10.0138 12.082 11.8145 12.8711 13.2037 13.6284C14.0141 14.0702 14.4193 14.2911 14.6847 14.2586C14.9308 14.2285 15.1169 14.118 15.2612 13.9163C15.4167 13.6988 15.4167 13.2637 15.4167 12.3935V4.27061C15.4167 3.40037 15.4167 2.96525 15.2612 2.74778C15.1169 2.54612 14.9308 2.43562 14.6847 2.40548C14.4193 2.37297 14.0141 2.59387 13.2037 3.03567C11.8145 3.79297 10.0138 4.58204 8.54175 4.58204Z" stroke="#007AFF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h1>Bet #125 placed on NBA, $200 wagered.</h1>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5L5 15M5 5L15 15" stroke="#444444" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div> */}
            {/* <div className="flex flex-row items-center justify-center gap-4 rounded-xl bg-[#FF00000D] px-4 py-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.99817 7.49677V10.8301M9.99817 14.1634H10.0065M8.84427 3.23988L1.99019 15.0787C1.61002 15.7354 1.41994 16.0637 1.44803 16.3332C1.47254 16.5682 1.59568 16.7818 1.78681 16.9208C2.00594 17.0801 2.38533 17.0801 3.1441 17.0801H16.8522C17.611 17.0801 17.9904 17.0801 18.2095 16.9208C18.4007 16.7818 18.5238 16.5682 18.5483 16.3332C18.5764 16.0637 18.3863 15.7354 18.0061 15.0787L11.1521 3.23987C10.7733 2.58557 10.5839 2.25842 10.3368 2.14854C10.1212 2.0527 9.87513 2.0527 9.65959 2.14854C9.41248 2.25842 9.22307 2.58557 8.84427 3.23988Z" stroke="#FF3B30" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h1>Reduce exposure for NFL bets.</h1>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5L5 15M5 5L15 15" stroke="#444444" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div> */}
          </div>
        </div>
      </div>
      }
      {showPoolList&&
      <>
        <div className="flex flex-col overflow-x-auto">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">#</th>
                      <th scope="col" className="px-6 py-4">PoolName</th>
                      <th scope="col" className="px-6 py-4">PoolAddress</th>
                      <th scope="col" className="px-6 py-4">Poolsize</th>
                      <th scope="col" className="px-6 py-4">InitFund</th>
                      <th scope="col" className="px-6 py-4">SupportedLeagues</th>
                      <th scope="col" className="px-6 py-4">BetTypes</th>
                      <th scope="col" className="px-6 py-4">Admins</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      allPools.map((pool, index) =>(
                        <tr key={index} className="border-b dark:border-neutral-500" onClick={()=>{setSelectedPoolData(pool); setSelectedPool(true)}}>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
                          <td className="whitespace-nowrap px-6 py-4">{pool.name}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-red-500" ><a target="_blank" href={`https://sepolia.etherscan.io/address/${pool.poolAddress}`}>{`${pool.poolAddress.slice(0,5)}...${pool.poolAddress.slice(-3)}`}</a></td>
                          <td className="whitespace-nowrap px-6 py-4">{pool.size.toString()}</td>
                          <td className="whitespace-nowrap px-6 py-4">{pool.initialFundingAmount.toString()}</td>
                          <td className="whitespace-nowrap px-6 py-4">{pool.supportedLeagues}</td>
                          <td className="whitespace-nowrap px-6 py-4">{pool.betTypes}</td>
                          <td className="whitespace-nowrap px-6 py-4" title={pool.admins}>{pool.admins[0].slice(0, 5)}...</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
      }

      {selectedPool && <Modal onClose={() => setSelectedPool(false)}>
        <div className="flex flex-col items-center justify-center gap-8 text-black w-[450px] p-12">
          <h1 className="font-bold text-xl">Pool Deposit/Withdraw</h1>
          <div className="flex justify-center mb-8">
          </div>
          <div className="flex flex-col items-start justify-center w-full">
            <h1 className="text-gray-500">Deposit</h1>
            <div className="flex flex-row items-center justify-center gap-4 mt-4">
              <input type="text" value = {depositAmount} className="rounded-full w-full bg-gray-100 py-2 px-4 focus:outline-none focus:bg-gray-200" onChange={(e: any)=>{setDepositAmount(e.target.value)}}/>
              <button onClick={() => { depositHandle() }} className="bg-blue-800 hover:bg-gray-500 text-white font-medium py-2 px-6 rounded-full flex flex-row items-center justify-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h1>Deposit</h1>
              </button>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center w-full">
            <h1 className="text-gray-500">Withdraw</h1>
            <div className="flex flex-row items-center justify-center gap-4 mt-4">
              <input type="text" value = {withdrawAmount} className="rounded-full w-full bg-gray-100 py-2 px-4 focus:outline-none focus:bg-gray-200" onChange={(e: any)=>{setWithdrawAmount(e.target.value)}}/>
              <button onClick={() => { withdrawHandle() }} className="bg-red-400 hover:bg-gray-500 text-white font-medium py-2 px-6 rounded-full flex flex-row items-center justify-center gap-2">
                <h1>Withdraw</h1>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-row w-full justify-end">
            <button onClick={() => { setSelectedPool(false) }} className="bg-green-400 hover:bg-gray-500 text-white font-medium py-2 px-6 rounded-full flex flex-row items-center justify-center gap-2">
              <h1>Close</h1>
            </button>
          </div>
        </div>
      </Modal>}
    </div>
  </div>
};

export default Liquidity;
