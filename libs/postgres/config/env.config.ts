export const EnvConfiguration = () => ({ 
  database: { 
    user: process.env.PG_USER || 'postgres',
    host: process.env.PG_HOST || 'localhost',
    port: Number(process.env.PG_PORT) || 5432,
    database: process.env.PG_DATABASE || 'postgres',
    password: process.env.PG_PASSWORD || 'postgres'
  }
})

export const database = 'database'
