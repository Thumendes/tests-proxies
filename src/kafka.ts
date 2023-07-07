import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  brokers: ["diverse-kid-8780-us1-kafka.upstash.io:9092"],
  sasl: {
    mechanism: "scram-sha-256",
    username: "ZGl2ZXJzZS1raWQtODc4MCQ0_Vl6yrNF0hrvVfZHgKKzFWwyZma52VjL_pbM7Bw",
    password: "028559021ff24dd5b75d62b712f29d76",
  },
  ssl: true,
});
