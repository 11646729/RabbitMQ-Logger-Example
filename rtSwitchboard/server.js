import express from "express"
import nodeCron from "node-cron"
import bodyParser from "body-parser"
import Producer from "./producer.js"

const producer = new Producer()

const app = express()

app.use(bodyParser.json())

// app.post("/sendLog", async (req, res, next) => {
//   await producer.publishMessage(req.body.logType, req.body.message)
//   res.send()
// })

nodeCron.schedule("*/5 * * * * *", () => {
  // Do whatever you want in here. Send email, Make  database backup or download data.
  const weatherMessage = "This is a Weather message"
  const newsMessage = "This is a News message"

  producer.publishMessage("Weather", weatherMessage)
  producer.publishMessage("News", newsMessage)
})

app.listen(3000, () => {
  console.log("Server started...")
})
