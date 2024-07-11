const express = require('express')
const articleController = require ('../controllers/ArticleController')
const articleRouter = express.Router()
const upload = require('../middleware/upload')
const {authenticateMiddleware, admin} = require('../middleware/auth')

articleRouter.post('/', authenticateMiddleware ,upload.single('contentFile'), articleController.createArticle);
articleRouter.put('/:id', authenticateMiddleware , upload.single('contentFile'), articleController.updateArticle);
articleRouter.delete('/:id', authenticateMiddleware, articleController.deleteArticle);
articleRouter.get('/', authenticateMiddleware ,articleController.getAllArticle);
articleRouter.get('/admin', admin, articleController.getAdminArticle);

module.exports = articleRouter;
