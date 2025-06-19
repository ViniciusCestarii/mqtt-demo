import db from '@/db'

export async function GET() {
  const result = await db.query('SELECT temperature, created_at FROM sensor_readings ORDER BY created_at DESC LIMIT 100')
  return Response.json(result.rows)
}