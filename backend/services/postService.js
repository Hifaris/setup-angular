const postRepository = require('../repository/postRepository');


function addPost(title, content) {
  return postRepository.createPost(title, content);
}

function getAllPosts() {
  return postRepository.getAllPosts();
}

function getPostById(id) {
  return postRepository.getPostById(id);
}

function updatePost(id, title, content) {
  return postRepository.updatePostById(id, title, content);
}

function deletePost(id) {
  return postRepository.deletePostById(id);
}


module.exports = {
  addPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
};
