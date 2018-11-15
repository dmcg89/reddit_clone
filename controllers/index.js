// index

const { Router } = require('express');
const router = Router();

const Post = require('../models/post');

router.get('/', (req, res) => {
    const currentUser = req.user;

    Post.find({}).populate('author')
    .then(posts => {
        res.render("posts-index", { posts, currentUser });
    })
    .catch(err => {
        console.log(err.message);
    })
});

module.exports = router;
