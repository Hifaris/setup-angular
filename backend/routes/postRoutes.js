const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/api/post', postController.createPost);
router.get('/api/post', postController.getAllPosts);
router.get('/api/post/:id', postController.getPostById);
router.put('/api/post/:id', postController.updatePost);
router.delete('/api/post/:id', postController.deletePost);

module.exports = router;
