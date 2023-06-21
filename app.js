const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.user(bodyParser.json());

let blogPosts = [];
let currentId = 1;

// GET all blog posts
app.get('/blog-posts', (req, res) => {
    res.send(blogPosts);
});

// Get blog post by id
app.get('/blog-posts/:id', (req, res) => {
    const postId = Number(req.params.id);
    const foundPost = blogPosts.find(post => post.id === postId);
    if (foundPost) {
        res.send(foundPost);
    } else {
        res.status(404).send({error: "Post not found"});
    }
});

// Create blog post
app.post('/blog-posts', (req, res) => {
    const newPost = {
        id: currentId++,
        title: req.body.title,
        content: req.body.content
    };
    blogPosts.push(newPost);
    res.send(newPost);
});

// update blog post
app.put('/blog-posts/:id', (req, res) => {
    const postId = Number(req.params.id);
    const postIndex = blogPosts.findIndex(post => post.id === postId);
    if (postIndex > -1) {
        const updatedPost = {
            id: postId,
            title: req.body.title,
            content: req.body.content
        };
        blogPosts[postIndex] = updatedPost;
        res.send(updatedPost);
    } else {
        res.status(404).send({error: "Post not found"});
    }
});

// Delete a blog post
app.delete('/blog-posts/:id', (req, res) => {
    const postId = Number(req.params.id);
    const postIndex = blogPosts.findIndex(post => post.id === PostId);
    if (postIndex > -1) {
        const deletedPost = blogPosts.splice(postIndex, 1);
        res.send(deletedPost);
    } else {
        res.status(404).send({error: "Post not found"});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));