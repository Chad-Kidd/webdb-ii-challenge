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


// GET BY ID WORKING
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


// GET WORKING
server.get('/api/zoos', (req, res) => {
  db('zoos') //returns a promise use .then and .catch
  .then(zoos => {
    res.status(200).json(zoos)
  }).catch(error => {
    console.log(error)
  })
  // get the zoos from the database
  //res.send('Write code to retrieve all zoos');
});


//DELETE WORKING
server.delete('/api/zoos/:id', (req, res) => {
  // remove roles (inactivate the role)
  db('zoos')
  .where({id: req.params.id})
  .delete()
  .then(count => {
    if(count > 0) {
      res.status(200).json({message: `${count} zoo(s) deleted`})
    } else {
      res.status(404).json({message: 'zoo does not exist'})
    }
  })
  .catch(error => {
    res.send(500).json(error);
  })
});


// PUT - UPDATE WORKING
server.put('/api/zoos/:id', (req, res) => {
  // update roles FILTER RECORDS THEN UPDATE
  db('zoos')
  .where({id: req.params.id})
  .update(req.body)
  .then(count => {
    if(count > 0) {
      res.status(200).json({message: `${count} record updated`})
    } else {
      res.status(404).json({message: 'zoo does not exist'})
    }
  })
  .catch(error => {
    res.send(500).json(error);
  })
  //res.send('Write code to modify a role');
});


//SERVER PORT
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});