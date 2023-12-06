NodeJs microservices with RabbitMQ implementation of the direct exchange type.

2 consumers => rtWeatherMS and rtNewsMS

1 producer => rtSwitchboard

Idea : Make an API call to create a log, by specifying the log type, which will be used as a message routing key, to be used by the direct exchange,
to correctly route the message to the correct queues. rtWeatherMS and rtNewsMS, act as consumers, both listening on 2 different queues, with their own binding keys.
