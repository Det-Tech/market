
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrum, base, mainnet, optimism, polygon, sepolia } from 'wagmi/chains';
import { http } from 'wagmi'
import { createConfig,} from "@wagmi/core";

const supportedChains: any = [mainnet, sepolia, polygon, optimism, arbitrum, base];

export const config = getDefaultConfig({
  appName: 'Sport Market',
  projectId: '4447f850fb83e59da5840789a78f9876',
  chains: supportedChains,
});

export const wagmiConfig = createConfig({
  // autoConnect: true, // Automatically connect user wallets if possible
  chains: supportedChains,
  transports: {
    [sepolia.id]: http("https://sepolia.infura.io/v3/2ab0947ce26c439189703cae9c1814ac"),
    [mainnet.id]: http(),
  },
})
