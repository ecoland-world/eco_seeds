"use client"

import Image from "next/image"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Wallet, XOctagon } from "lucide-react"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {/* <Button>
              <Wallet className="mr-2 h-4 w-4" />
              Connect
            </Button> */}

            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== "loading"
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === "authenticated")

                return (
                  <div
                    {...(!ready && {
                      "aria-hidden": true,
                      style: {
                        opacity: 0,
                        pointerEvents: "none",
                        userSelect: "none",
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <Button onClick={openConnectModal}>
                            <Wallet className="mr-2 h-4 w-4" />
                            Connect
                          </Button>
                        )
                      }

                      if (chain.unsupported) {
                        return (
                          <Button onClick={openChainModal}>
                            <XOctagon className="mr-2 h-4 w-4" />
                            Wrong Network
                          </Button>
                        )
                      }

                      return (
                        <div style={{ display: "flex", gap: 12 }}>
                          <button
                            onClick={openChainModal}
                            style={{ display: "flex", alignItems: "center" }}
                            type="button"
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 24,
                                  height: 24,
                                  borderRadius: 999,
                                  overflow: "hidden",
                                  marginRight: 4,
                                }}
                              >
                                {chain.iconUrl && (
                                  <Image
                                    alt={chain.name ?? "Chain icon"}
                                    src={chain.iconUrl}
                                    width={24}
                                    height={24}
                                  />
                                )}
                              </div>
                            )}
                            {chain.name}
                          </button>

                          <Button onClick={openAccountModal}>
                            <Wallet className="mr-2 h-4 w-4" />
                            {account.displayName}
                          </Button>
                        </div>
                      )
                    })()}
                  </div>
                )
              }}
            </ConnectButton.Custom>

            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
