import { kafka } from "./kafka";

const consumer = kafka.consumer({ groupId: "testing" });
await consumer.connect();
console.log(`[Consumer] Connected`);

await consumer.subscribe({ topic: "caca-links", fromBeginning: true });

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log("[Consumer]", {
      partition,
      offset: message.offset,
      value: message.value?.toString(),
    });
  },
});
