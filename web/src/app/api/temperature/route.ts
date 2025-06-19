import db from '@/db'

export async function GET() {
  const query = `
    SELECT temperature, created_at 
    FROM sensor_readings 
    WHERE created_at >= NOW() - INTERVAL '12 hours'
    ORDER BY created_at DESC
  `
  const result = await db.query(query)
  return Response.json(result.rows)
}