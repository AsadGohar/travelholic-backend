const express = require ('express');
const router = express.Router();

const SearchControllers = require('../Controllers/SearchControllers')

router.get('/:word', SearchControllers.search)

module.exports = router
