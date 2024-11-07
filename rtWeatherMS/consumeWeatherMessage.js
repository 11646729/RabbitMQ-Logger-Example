import { connect } from "amqplib"
import { rabbitMQ } from "./rtWeatherMSconfig.js"

//step 1 : Connect to the rabbitmq server
//step 2 : Create a new channel
//step 3 : Create the exchange
//step 4 : Create the queue
//step 5 : Bind the queue to the exchange
//step 6 : Consume messages from the queue

async function consumeWeatherMessage() {
  const connection = await connect(rabbitMQ.exchangeUrl)
  const channel = await connection.createChannel()

  await channel.assertExchange(rabbitMQ.exchangeName, rabbitMQ.exchangeType)

  const q = await channel.assertQueue("WeatherQueue")

  await channel.bindQueue(q.queue, rabbitMQ.exchangeName, "Weather")

  channel.consume(q.queue, (msg) => {
    const data = JSON.parse(msg.content)
    console.log(data)
    channel.ack(msg)
  })
}

consumeWeatherMessage()

export default consumeWeatherMessage
