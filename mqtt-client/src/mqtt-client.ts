import "dotenv/config"
import mqtt from "mqtt";
import db from "./db";

if (!process.env.MQTT_SERVER_URL) {
  throw new Error("MQTT_SERVER_URL not found on env!")
}

const client = mqtt.connect(process.env.MQTT_SERVER_URL);

client.on("connect", () => {
  console.log(`Connected to ${process.env.MQTT_SERVER_URL}`)
  client.subscribe("temperature-sensor/#", (err) => {
    if (err) {
      throw err
    }
  });
});

client.on("message", (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
  try {
    const { temperature } = JSON.parse(message.toString());
    db.query(`INSERT INTO sensor_readings (temperature) VALUES ($1)`, [temperature])
    console.log(`Inserted temperature ${temperature} into database`)
  } catch (err) {
    console.error(`Error parsing message: ${err}`)
  }
});