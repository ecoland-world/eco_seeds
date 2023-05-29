import { useState } from "react"
import Link from "next/link"
import { ethers } from "ethers"
import { parseEther, parseUnits } from "ethers/lib/utils"
import {
  erc20ABI,
  useContractWrite,
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi"

import { Button } from "@/components/ui/button"

import ecoseedsAbi from "../../abi/ecoseeds.json"

const TransactionInterface = () => {
  const address = "0x52F67De5272482fF8BAC095847faB7f0D355E7db" //ECOSSEDS contract address

  const limit = ethers.utils.parseEther("100000")
  // NOW TIMESTAMP in seconds
  const now = Math.floor(Date.now() / 1000)
  // lockInEnd in 1 day
  let lockInEnd = now + 86400

  const { config: configWrite, error } = usePrepareContractWrite({
    address: address, //My wallet address
    abi: ecoseedsAbi,
    functionName: "createSale",
    args: [
      ethers.utils.parseEther("0.1"),
      lockInEnd,
      limit,
      false,
      "EcoSeeds Token 1",
      "EST1",
    ],
    suspense: true,
  })
  const { data, write, isLoading, isSuccess } = useContractWrite(configWrite)

  return (
    <>
      <>
        <Button disabled={!write} onClick={() => write?.()}>
          {!isSuccess && !isLoading && <div>Create new sale</div>}
          {isLoading && <div>Creating new sale...</div>}
          {isSuccess && <div>New sale created! </div>}
        </Button>

        {error && (
          <div>
            An error occurred preparing the transaction: {error.message}
          </div>
        )}
        {isSuccess && (
          <div>
            Transaction:{" "}
            <Link
              target="_blank"
              href={`https://alfajores.celoscan.io/tx/${JSON.stringify(
                data?.hash
              ).slice(1, -1)}`}
            >
              {JSON.stringify(data?.hash)}
            </Link>
          </div>
        )}
      </>
    </>
  )
}

export default TransactionInterface
