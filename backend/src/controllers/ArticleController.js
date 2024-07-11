const articleService = require ('../servvices/ArticleService')

class ArticleController {

    async createArticle(req, res){
        try{
            const articleData = {
                title: req.body.title,
                contentText: req.body.contentText || '',
                contentFile: req.file ? req.file.path: '', 
                user: req.body.user
            }
            const article = await articleService.createArticle(articleData, req.user);
            res.status(201).send(article)
        }catch(err){
            res.status(400).send({ err : err.message })
        }
    }


    async updateArticle(req, res){
        try{
            const article = await articleService.updateArticle(req.params.id, req.body, req.user.userId)
            if(!article){
                return res.status(404).send({err : 'Status not found!'})
            }
            res.status(200).send(article)
        }catch(err){
            res.status(400).send({ err : err.message })
        }
    }

    async deleteArticle(req, res){
        try{
            const article = await articleService.deleteArticle(req.params.id, req.user.userId)
            if(!article){
                return res.status(404).send({err : 'Status not found!'})
            }
            res.send({message: 'Status deleted successfully!'})
        }catch(err){
            res.status(400).send({ err : err.message })
        }
    }

    async getAdminArticle(req, res){
        try {
            const articles = await articleService.getAdminArticle();
            res.send(articles);
        } catch (error) {
            res.status(400).send({ err : err.message });
        }
    }

    async getAllArticle(req, res){
        try{
            const articles = await articleService.getAllArticle()
            res.send(articles)
        }catch(err){
            res.status(400).send({ err : err.message })
        }
    }

}

module.exports = new ArticleController()