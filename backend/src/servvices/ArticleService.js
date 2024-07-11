const Article = require('../models/ArticleModel')

class articleService {

    async createArticle(articleData){
        const article = new Article(articleData);
        return await article.save();
    }

    async getArticleById(articleId){
        return await Article.findById(statusId);
    }

    async updateArticle(articleId, articleData) {
        return await Article.findByIdAndUpdate(articleId, articleData, {new:true});
    }

    async deleteArticle(articleId) {
        return await Article.findByIdAndDelete(articleId);
    }

    async getAllArticle(){
        return await Article.find();
    }

    async getAdminArticle() {
        const articles = await Article.find().populate('author', 'username');
    }
}

module.exports = new articleService();