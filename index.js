const pg = require('pg')
const express = require('express')
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/the_acme_icecream_db');
const app = express()
const port = process.env.PORT || 4000

app.use(express.json());
app.use(require('morgan')('dev'));



app.post('/api/shop', async (req, res, next) => {
    try{
        const SQL = `
        INSERT INTO shop(name)
        VALUES($1)
        RETURNING *
        `
        const response = await client.query(SQL,  [req.body.txt]);
        res.send(response.rows[0]);
    }catch(ex){
        next(ex);
    }
});
app.get('/api/shop', async (req, res, next) => {
    try{
        const SQL = `
        SELECT * from shop ORDER BY created_at DESC;
        `
        const response = await client.query(SQL);
        res.send(response.rows);
    }catch(ex){
        next(ex);
    }
});
app.put('/api/shop/:id', async (req, res, next) => {
    try{
        const SQL = `
        UPDATE shop
        SET name=$1, is_favorite=$2, updated_at= now()
        WHERE id=$3 RETURNING *
        `
        const response = await client.query(SQL, [req.body.name, req.body.is_favorite, req.params.id]);
        res.send(response.rows[0]);
    }catch(ex){
        next(ex);
    }
});
app.delete('/api/shop/:id', async (req, res, next) => {
    try{
        const SQL = `
        DELETE from shop
        WHERE id = $1
        `
        const response = await client.query(SQL, [req.params.id]);
        res.sendStatus(204);
    }catch(ex){
        next(ex);
    }
});








const init = async () => {
    await client.connect();
    console.log('connected to database');
    let SQL = `
    DROP TABLE IF EXISTS shop;
    CREATE TABLE shop(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
        is_favorite BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
    );

    INSERT INTO shop(name, is_favorite) VALUES('Chocolate', true);
    INSERT INTO shop(name) VALUES('Vanilla');
    INSERT INTO shop(name) VALUES('Stawberry');
    `
    await client.query(SQL);
  }
  
  init();

  app.listen(port, () => console.log(`listening on port ${port}`))