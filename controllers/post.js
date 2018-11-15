const { Router } = require('express');
const router = Router();

const Post = require('../models/post');
const User = require('../models/user');

// Show new form
router.get('/new', (req, res) => {
    const currentUser = req.user;

    res.render('posts-new', {currentUser});
});

// Show post
router.get('/:id', (req, res) => {
    const currentUser = req.user;

    Post.findById(req.params.id)
    .populate('author')
    .populate({path: 'comments', populate: {path: 'author'}})
    .then(post => {
        res.render('posts-show', { post, currentUser });
    })
    .catch(err => {
        console.log(err.message);
    });
});

// Post new post
router.post('/new', (req, res) => {
    if (req.user) {
        const post = new Post(req.body);
        post.author = req.user._id;

        post.save()
        .then(user => {
            return User.findById(req.user._id);
        })
        .then(user => {
            user.posts.unshift(post);
            user.save();
            // Redirect to the new post
            res.redirect('/posts/' + post._id);
        })
        .catch(err => {
            console.log(err.message);
        })
    } else {
        res.status(401);
    };
});

module.exports = router;
