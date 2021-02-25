const express = require('express');
const router = express.Router();
const { sequelize } = require('./db/models')

router.get('/', async (req, res) => {
    // throw new Error('This is a test error!');
    await sequelize.query('SELECT 1+1 AS RESULT;')
    res.render('index', { title: 'Home' });
});

module.exports = router;
