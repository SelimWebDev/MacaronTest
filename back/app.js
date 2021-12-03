const express = require('express');

const dataRoutes = require('./routes/data.js')

const app = express();

app.use((req, res, next) => {                   
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(express.json());

  app.use('/api/data', dataRoutes)
  
  module.exports = app;