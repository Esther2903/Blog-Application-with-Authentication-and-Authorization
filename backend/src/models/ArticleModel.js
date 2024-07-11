const mongoose = require ('mongoose')

const ArticlesSchema = new mongoose.Schema ({
    title: {type: String, required: true},
    contentText: {type: String, required: false},
    contentFile: { type: String, required: false},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User',  required: true },
    createDate: {type: Date, default: Date.now}
})

const Articles = mongoose.model('Articles', ArticlesSchema)
module.exports = Articles;