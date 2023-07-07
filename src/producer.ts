import { kafka } from "./kafka";
import { sleep } from "./utils";

const producer = kafka.producer();
await producer.connect();
console.log(`[Producer] Connected`);

for (let i = 0; i < 10; i++) {
  const id = Math.random().toString(36).substring(7);

  console.log(`[Producer]`, id);
  await producer.send({
    messages: [{ value: id }],
    topic: "caca-links",
  });

  const sleepTime = Math.floor(Math.random() * 10000);
  await sleep(sleepTime);
}

await producer.disconnect();
