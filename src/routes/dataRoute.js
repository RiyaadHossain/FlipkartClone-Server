const express = require('express');
const route = express.Router()
const { initialData } = require('../controllers/dataController');

route.get("/initialData", initialData)

module.exports = route