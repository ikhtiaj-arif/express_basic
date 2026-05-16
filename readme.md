1.  created express server
2.  added typescript and tsc config
3.  how to use default middlewares of express to receive different format data like: JSON, Text, urlencoded app.use(express.json());app.use(express.text());app.use(express.urlencoded());
4.  connected with neon - serverless Postgres with Pg package and used Pool class to connect connectionstring.
5.  postgreSQL is a structured query language consists of row column - table like structure
    SQL data types: boolean, numbers, binary, date/time, json, character, UUID, array, xml
6.  connect db using pool.query inside an async function dbInit
7.  create new table users await pool.query(`
CREATE TABLE IF NOT EXISTS users()`)
8.  create user using insert: const result = await pool.query(
    `
    INSERT INTO users (name, email, age, password) VALUES($1,$2,$3,$4) RETURNING \*

    `,
    [name, email, age, password],
    );

9.  Retrieve users --> to retrieve user using id use WHERE claws. TO retrieve all dont use WHERE Claws
    const result = await pool.query(
    `         SELECT * FROM users WHERE id=$1
    `,
    [id],
    );
10. Update using put using COALESCE claws to keep the field value if not provided when updating, otherwise will set to null resulting data loss
     const result = await pool.query(
      `
            UPDATE users 
            SET 
            name=COALESCE($1, name), 
            age=COALESCE($2, age), 
            password=COALESCE($3, password), 
            is_active=COALESCE($4, is_active)

            WHERE id=$5 RETURNING *
            `,
      [name, age, password, is_active, id],
    );

     - separate db connection to db folder
     - all app logic moved to app.ts
     - server only handles server connection