"use client"

import { useCallback, useRef, useState } from "react"
import Link from "next/link"
import { ethers } from "ethers"
import { parseEther, parseUnits } from "ethers/lib/utils"
import ReactCanvasConfetti from "react-canvas-confetti"
import {
  erc20ABI,
  useContractWrite,
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

import ecoseedsAbi from "../../abi/ecoseeds.json"

interface InvestProps {
  token: string
  amount: string
}

const InvestComponent = (props: React.PropsWithChildren<InvestProps>) => {
  const refAnimationInstance = useRef(null)
  const { toast } = useToast()
  const address = "0x52F67De5272482fF8BAC095847faB7f0D355E7db" //ECOSSEDS contract address
  console.log({ props })
  const limit = ethers.utils.parseEther("100000")
  // NOW TIMESTAMP in seconds
  const now = Math.floor(Date.now() / 1000)
  // lockInEnd in 1 day
  let lockInEnd = now + 86400

  const { config: configWrite, error } = usePrepareContractWrite({
    address: address, //My wallet address
    abi: ecoseedsAbi,
    functionName: "buyTokens",
    // @ts-ignore
    overrides: {
      value: ethers.utils.parseEther(props.amount),
    },
    args: [props.token],
    suspense: true,
  })
  const { data, write, isLoading, isSuccess } = useContractWrite(configWrite)

  const shortenTxAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }
  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance
  }, [])

  const makeShot = useCallback((particleRatio: number, opts: any) => {
    refAnimationInstance.current &&
      // @ts-ignore
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      })
  }, [])

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    })

    makeShot(0.2, {
      spread: 60,
    })

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    })

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    })

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    })
  }, [makeShot])
  return (
    <>
      <>
        <ReactCanvasConfetti
          refConfetti={getInstance}
          style={{
            position: "fixed",
            pointerEvents: "none",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            zIndex: 999,
          }}
        />
        <Button disabled={!write} onClick={() => write?.()}>
          {!isSuccess && !isLoading && <>Invest</>}
          {isLoading && <>Loading...</>}
          {isSuccess && <>Success! </>}
        </Button>

        {error && (
          <div>
            An error occurred preparing the transaction: {error.message}
          </div>
        )}
        {isSuccess &&
          (fire(),
          (
            <Link
              target="_blank"
              href={`https://alfajores.celoscan.io/tx/${JSON.stringify(
                data?.hash
              ).slice(1, -1)}`}
              className=""
            >
              {shortenTxAddress(JSON.stringify(data?.hash))}
            </Link>
          ))}
      </>
    </>
  )
}

export default InvestComponent
