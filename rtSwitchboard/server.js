import express from "express"
import nodeCron from "node-cron"
import pkg from "body-parser"
import Producer from "./producer.js"

const { json } = pkg

const producer = new Producer()

const app = express()

app.use(json("application/json"))

// app.post("/sendLog", async (req, res, next) => {
//   await producer.publishMessage(req.body.logType, req.body.message)
//   res.send()
// })

nodeCron.schedule("*/5 * * * * *", () => {
  // Do whatever you want in here. Send email, Make  database backup or download data.
  producer.publishMessage("Weather", "This is a Weather message")
  producer.publishMessage("News", "This is a News message")
})

app.listen(3000, () => {
  console.log("Server started...")
})
