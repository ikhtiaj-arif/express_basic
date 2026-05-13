1.  created express server
2.  added typescript and tsc config
3.  how to use default middlewares of express to receive different format data like: JSON, Text, urlencoded app.use(express.json());app.use(express.text());app.use(express.urlencoded());
4.  connected with neon - serverless Postgres with Pg package and used Pool class to connect connectionstring.
5.  postgreSQL is a structured query language consists of row column - table like structure
    SQL data types: boolean, numbers, binary, date/time, json, character, UUID, array, xml
6.  connect db using pool.query inside an async function dbInit
7.  create new table users await pool.query(`
    CREATE TABLE IF NOT EXISTS users()`)
8. create user using insert:   const result = await pool.query(
      `
    INSERT INTO users (name, email, age, password) VALUES($1,$2,$3,$4) RETURNING *
    
    `,
      [name, email, age, password],
    );