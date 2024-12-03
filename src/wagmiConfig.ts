
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrum, base, mainnet, optimism, polygon, sepolia } from 'wagmi/chains';
import { http, createConfig } from 'wagmi'

export const config = getDefaultConfig({
  appName: 'Sport Market',
  projectId: '4447f850fb83e59da5840789a78f9876',
  chains: [mainnet, sepolia, polygon, optimism, arbitrum, base],
});

export const config1 = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
