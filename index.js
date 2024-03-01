const pg = require('pg')
const express = require('express')
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/the_acme_icecream_db');
const app = express()
const port = process.env.PORT || 3000

app.use(express.json());
app.use(require('morgan')('dev'));



app.post('/api/shop', async (req, res, next) => {
    try{
        const SQL = ``
        const response = await client.query(SQL);
        res.send(response.rows);
    }catch(ex){
        next(ex);
    }
});
app.get('/api/shop', async (req, res, next) => {
    try{
        const SQL = ``
        const response = await client.query(SQL);
        res.send(response.rows);
    }catch(ex){
        next(ex);
    }
});
app.put('/api/shop/:id', async (req, res, next) => {
    try{
        const SQL = ``
        const response = await client.query(SQL);
        res.send(response.rows);
    }catch(ex){
        next(ex);
    }
});
app.delete('/api/shop/:id', async (req, res, next) => {
    try{
        const SQL = ``
        const response = await client.query(SQL);
        res.send(response.rows);
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
    name STRING,
    is_favorite BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    );
    `;
    await client.query(SQL);
    console.log('tables created');
    SQL = `
    INSERT INTO shop(name, is_favorite) VALUES('Chocolate', true);
    INSERT INTO shop(name, is_favorite) VALUES('Vanilla');
    INSERT INTO shop(name, is_favorite) VALUES('Stawberry');
    `;
    await client.query(SQL);
    console.log('data seeded');
  };
  
  init();

  app.listen(port, () => console.log(`listening on port ${port}`))