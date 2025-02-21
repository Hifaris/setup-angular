const postService = require('../services/postService');

// Controller สำหรับจัดการ Request และ Response

async function createPost(req, res) {
  try {
    const { title, content } = req.body;
    const result = await postService.addPost(title, content);
    res.status(201).json({ message: 'Post added successfully', postId: result._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add post', error: error.message });
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json({ message: 'Posts fetched successfully', posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Fetching posts failed!' });
  }
}

async function getPostById(req, res) {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Fetching post failed!' });
  }
}

async function updatePost(req, res) {
  try {
    const { title, content } = req.body;
    await postService.updatePost(req.params.id, title, content);
    res.status(200).json({ message: 'Update successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Updating post failed!' });
  }
}

async function deletePost(req, res) {
  try {
    await postService.deletePost(req.params.id);
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Deleting post failed!' });
  }
}


module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
};
