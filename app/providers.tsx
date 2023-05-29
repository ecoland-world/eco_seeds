"use client"

import * as React from "react"
import {
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit"
import {
  argentWallet,
  ledgerWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets"
import { WagmiConfig, configureChains, createConfig } from "wagmi"
import {
  arbitrum,
  celo,
  celoAlfajores,
  goerli,
  mainnet,
  optimism,
  polygon,
} from "wagmi/chains"
import { Valora, CeloWallet } from "@celo/rainbowkit-celo/wallets";
import { Alfajores, Celo } from "@celo/rainbowkit-celo/chains";
import { publicProvider } from "wagmi/providers/public"


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    Celo,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [goerli, Alfajores]
      : []),
  ],
  [publicProvider()]
)

const projectId = "03f06b7a09157f638094c971965cd79d"

const { wallets } = getDefaultWallets({
  appName: "EcoSeeds",
  projectId,
  chains,
})

const demoAppInfo = {
  appName: "EcoSeeds",
}

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
      Valora({ projectId, chains }),
      CeloWallet({ projectId, chains }),
    ],
  },
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
