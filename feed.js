// Feed module: renders posts and provides search/filter functionality
import { API } from '../services/api.js';
import { createPostElement } from '../utils/domHelpers.js';

const postsContainer = document.getElementById('posts-container');
const searchInput = document.createElement('input');

export const FeedModule = {
  posts: [],

  init: async function() {
    // Add search input to feed
    this.setupSearch();

    // Load posts from API
    this.posts = await API.getPosts(10); // fetch 10 posts by default
    this.renderPosts(this.posts);
  },

  setupSearch: function() {
    searchInput.id = 'search-posts';
    searchInput.placeholder = 'Search posts...';
    searchInput.style.marginBottom = '1rem';
    postsContainer.parentElement.prepend(searchInput);

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = this.posts.filter(
        post => post.title.toLowerCase().includes(query) || post.body.toLowerCase().includes(query)
      );
      this.renderPosts(filtered);
    });
  },

  renderPosts: function(postsArray) {
    postsContainer.innerHTML = '';
    if (postsArray.length === 0) {
      postsContainer.innerHTML = '<p>No posts found.</p>';
      return;
    }
    postsArray.forEach(post => {
      const postEl = createPostElement(post);
      postsContainer.appendChild(postEl);
    });
  },

  addPost: function(post) {
    this.posts.unshift(post);
    this.renderPosts(this.posts);
  }
};