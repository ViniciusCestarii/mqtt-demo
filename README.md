# MQTT Temperature Demo

This project demonstrates a full-stack application for collecting, storing, and visualizing temperature sensor data using MQTT, PostgreSQL, and Next.js.

## Project Structure

```
mqtt-demo/
├── mqtt-client/      # Node.js MQTT client that ingests sensor data and stores it in PostgreSQL
└── web/              # Next.js web dashboard for live temperature visualization
```

---

## 1. MQTT Client

Located in [`mqtt-client/`](mqtt-client/):

- Connects to an MQTT broker (default: `mqtt://test.mosquitto.org`)
- Listens for messages on the `temperature-sensor/#` topic
- Parses temperature readings and inserts them into a PostgreSQL database

### Setup

1. Copy `.env.example` to `.env` and configure your environment variables:
   ```
   cp mqtt-client/.env.example mqtt-client/.env
   ```
2. Install dependencies:
   ```
   cd mqtt-client
   npm install
   ```
3. Start the client:
   ```
   npm start
   ```

---

## 2. Web Dashboard

Located in [`web/`](web/):

- Built with [Next.js](https://nextjs.org/)
- Fetches recent temperature readings from the database via an API route
- Displays a live-updating line chart

### Setup

1. Copy `.env.example` to `.env.local` and configure your PostgreSQL connection:
   ```
   cp web/.env.example web/.env.local
   ```
2. Install dependencies:
   ```
   cd web
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Database

Both the client and web dashboard use PostgreSQL. The client will automatically create the `sensor_readings` table if it does not exist.

Table schema:
```sql
CREATE TABLE IF NOT EXISTS sensor_readings (
  id SERIAL PRIMARY KEY,
  temperature REAL NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
```

---

## Environment Variables

See [`mqtt-client/.env.example`](mqtt-client/.env.example) and [`web/.env.example`](web/.env.example) for required variables.

---

## License

MIT