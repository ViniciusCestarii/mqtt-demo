import pg from 'pg'
const { Pool } = pg
 
const pool = new Pool()

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})
 
const db = await pool.connect()

export default db