const express = require('express');
const router = express.Router();
const db = require('./db/models')
const csrf = require('csurf');

const csrfProtection = csrf({ cookie: true });
const asyncHandler = (handler) => (res, req, next) => handler(res, req, next).catch(next)

router.get('/', asyncHandler (async (req, res, next) => {
    try{
        const books = await db.Book.findAll({order: [['title', 'ASC']]})
        res.render('books-list', { title: 'Books', books });
    } catch (err) {
        next(err)
    }
}))

router.get('/book/add', csrfProtection, (req, res) => {
    const book = db.Book.build();
    res.render('book-add', { title: 'Add Book', book, csrfToken: req.csrfToken })
})

router.post('/book/add', csrfProtection, asyncHandler(async (req, res) => {
    const { title, author, releaseDate, pageCount, publisher } = req.body;
    const book = db.Book.build({ title, author, releaseDate, pageCount, publisher });
    try{
        await book.save();
        res.redirect('/');
    } catch (err) {
        res.render('book-add', { title: 'Add Book', book, error: err, csrfToken: req.csrfToken() });
    }
}))

router.post('/book/edit/:id', async (req, res, next) => {})
router.get('/book/edit/:id', async (req, res, next) => {})

router.get('/book/delete/:id', async (req, res, next) => {})
router.post('/book/delete/:id', async (req, res, next) => {})


module.exports = router;
