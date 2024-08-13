const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    category: String,
    date: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

// Routes
app.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

app.post('/posts', async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.json(newPost);
});

app.put('/posts/:id', async (req, res) => {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPost);
});

app.delete('/posts/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
