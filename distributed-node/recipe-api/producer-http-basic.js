#!/usr/bin/env node
// distributed-node\recipe-api\producer-http-basic.js

const server = require('fastify')();
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 4000;

console.log(`worked pid=${process.pid}`);

server.get('/recipes/:id', async (req, reply) => {
  console.log(`worker request pid=${process.pid}`);
  const id = Number(req.params.id);
  if (id !== 42) {
    reply.statusCode = 404;
    return {
      error: 'not_found',
    };
  }
  return {
    producer_pid: process.pid,
    recipe: {
      id,
      name: 'Sarma',
      steps: 'Trhow in the pot',
      ingredients: [
        { id: 1, name: 'Chicken', quantity: '1 lb' },
        { id: 2, name: 'Sauce', quantity: '2 cups' },
      ],
    },
  };
});

server.listen(PORT, HOST, () => {
  console.log(`Producer running at http://${HOST}:${PORT}`);
});
