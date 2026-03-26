// Handles post creation and rendering
import { API } from '../services/api.js';
import { createPostElement } from '../utils/domHelpers.js';
const postForm = document.getElementById('postForm');
const postsContainer = document.getElementById('posts-container');

export const PostModule = {
  init: function() {
    this.loadPosts();
    postForm.addEventListener('submit', this.handlePostSubmit);
  },

  loadPosts: async function() {
    const posts = await API.getPosts(5);
    postsContainer.innerHTML = '';
    posts.forEach(post => {
      const postEl = createPostElement(post);
      postsContainer.appendChild(postEl);
    });
  },

  handlePostSubmit: async function(e) {
    e.preventDefault();
    const title = document.getElementById('postTitle').value.trim();
    const body = document.getElementById('postBody').value.trim();
    if (!title || !body) return alert('Please fill in both fields');

    const newPost = await API.createPost({ title, body });
    if (newPost) {
      postsContainer.prepend(createPostElement(newPost));
      postForm.reset();
    }
  }
};