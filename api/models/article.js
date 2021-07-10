import mongoose from 'mongoose';

const articleSchema = mongoose.Schema({
    slug: String,
    title: String,
    author: String,
    content: String,
    lastEditor: String,
    updatedAt: {type: Date, default: Date.now},
    createdAt: {type: Date, default: Date.now}
})

const Article = mongoose.model('Article', articleSchema);

export default Article;