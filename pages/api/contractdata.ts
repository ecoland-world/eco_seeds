import { NextApiRequest, NextApiResponse } from "next"
import { CeloProvider } from "@celo-tools/celo-ethers-wrapper";
import ecoseedsAbi from "../../abi/ecoseeds.json"
import { ethers } from "ethers";
import { Console } from "console";

const { MongoClient, ServerApiVersion } = require("mongodb")
require("dotenv").config()

const uri = process.env.MONGODB_URI

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

interface ProjectData {
  fullName: string
  email: string
  title: string
  telegramUser: string
  projectName: string
  projectDescription: string
  tokenInfo: string
  targetRaise: string
  chain: string
  projectStatus: string
  raisedBefore: string
  projectType: string
  websiteUrl: string
  whitepaperUrl: string | null
  projectTwitter: string | null
  projectTelegram: string | null
  projectGithub: string | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const body: ProjectData = req.body

  if (req.method === "GET") {
    const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org')
    await provider.ready
    const contract = req.query.contract
    const launchpad = new ethers.Contract("0x52F67De5272482fF8BAC095847faB7f0D355E7db", ecoseedsAbi, provider);
    const sales = await launchpad.Sales(contract)
    res.status(200).json({ success: true, data: sales })

  }
}
