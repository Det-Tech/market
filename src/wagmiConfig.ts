
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrum, base, mainnet, optimism, polygon, sepolia } from 'wagmi/chains';
import { http, createConfig } from 'wagmi'

const supportedChains: any = [mainnet, sepolia, polygon, optimism, arbitrum, base];

export const config = getDefaultConfig({
  appName: 'Sport Market',
  projectId: '4447f850fb83e59da5840789a78f9876',
  chains: supportedChains,
});

export const config1 = createConfig({
  // autoConnect: true, // Automatically connect user wallets if possible
  chains: supportedChains,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
