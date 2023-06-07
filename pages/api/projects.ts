import { NextApiRequest, NextApiResponse } from "next"

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

  //run().catch(console.dir);
  // we will use params to access the data passed to the dynamic route
  if (req.method === "GET") {
    // insert into db
    try {
      await client.connect()
      const database = client.db("ecoseeds")
      const collection = database.collection("projects")
      const result = await collection.find({}).toArray()
      res.status(200).json({ success: true, data: result })
    } catch (err) {
      res.status(400).json({ success: false })
    } finally {
      await client.close()
    }
  }
}
