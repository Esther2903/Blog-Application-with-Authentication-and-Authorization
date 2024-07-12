const express = require('express')
const articleController = require ('../controllers/ArticleController')
const articleRouter = express.Router()
const upload = require('../middleware/upload')
const {authenticateMiddleware, admin} = require('../middleware/auth')

articleRouter.post('/', authenticateMiddleware, admin, upload.single('contentFile'), articleController.createArticle);
articleRouter.put('/:id', authenticateMiddleware, admin, upload.single('contentFile'), articleController.updateArticle);
articleRouter.delete('/:id', authenticateMiddleware, admin, articleController.deleteArticle);
articleRouter.get('/', authenticateMiddleware,admin ,articleController.getAllArticle);
articleRouter.get('/admin', admin, articleController.getAdminArticle);

module.exports = articleRouter;
