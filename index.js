const express = require('express');
const helmet = require('helmet');
const knex = require('knex')

const server = express();

server.use(express.json());
server.use(helmet());

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.sqlite3'
  },
  useNullAsDefault: true,
 debug: true
}

const db = knex(knexConfig);
// endpoints here

//POST WORKING
server.post('/api/zoos', (req, res) => {
  db('zoos').insert(req.body, 'id')
  .then(results => {
    res.status(200).json(results)
  })
  .catch(error => {
    res.status(500).json({ message: 'sorry buddy'})
  })
})

// GET BY ID
server.get('/api/zoos/:id', (req, res) => {
  db('zoos').where({id: req.params.id})
  .first()
  .then(zoo => {
    if(zoo) {
      res.status(200).json(zoo)
    } else {
      res.status(404).json({message: 'zoo not found'})
    }
  })
  .catch(error => {
    res.status(500).json(error)
  })
})


//SERVER PORT
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});