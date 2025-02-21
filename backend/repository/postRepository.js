const Post = require('../models/post');

function createPost(title, content) {
  const post = new Post({ title, content });
  return post.save();
}

function getAllPosts() {
  return Post.find();
}

function getPostById(id) {
  return Post.findById(id);
}

function updatePostById(id, title, content) {
  return Post.updateOne({ _id: id }, { title, content });
}

function deletePostById(id) {
  return Post.deleteOne({ _id: id });
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById
};
