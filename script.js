// script.js
// Imports (paths based on your folder structure)
import { API } from './services/api.js';
import { saveToStorage, loadFromStorage } from './services/storage.js';
import { createPostElement } from './utils/domHelpers.js';

/* ===== USER MODULE ===== */
const profilePicEl = document.getElementById('profile-pic');
const usernameEl = document.getElementById('username');

export const UserModule = {
  user: { username: 'Guest', profilePic: 'assets/images/default-profile.png' },

  init: function() {
    this.loadUser();
    this.setupEvents();
  },

  loadUser: function() {
    const savedUser = loadFromStorage('moodpalette-user');
    if (savedUser) this.user = savedUser;
    this.render();
  },

  render: function() {
    profilePicEl.src = this.user.profilePic;
    usernameEl.textContent = this.user.username;
  },

  setupEvents: function() {
    profilePicEl.addEventListener('click', this.changeProfilePic.bind(this));
    usernameEl.addEventListener('click', this.changeUsername.bind(this));
  },

  changeProfilePic: function() {
  const fileInput = document.getElementById('profile-upload');
  fileInput.click(); // open file dialog

  fileInput.onchange = () => {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.user.profilePic = e.target.result; // base64 image
        this.render(); // update UI
        saveToStorage('moodpalette-user', this.user); // save in localStorage
      };
      reader.readAsDataURL(file); // convert file to base64
    }
  };
  },

  changeUsername: function() {
    const newUsername = prompt('Enter new username:');
    if (newUsername && newUsername.trim() !== '') {
      this.user.username = newUsername.trim();
      this.render();
      saveToStorage('moodpalette-user', this.user);
    }
  }
};

/* ===== FEED MODULE ===== */
const postsContainer = document.getElementById('posts-container');
const searchInput = document.createElement('input');

export const FeedModule = {
  posts: [],

  init: async function() {
    this.setupSearch();
    this.posts = await API.getPosts(10); // load 10 posts
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

/* ===== POST MODULE ===== */
const postForm = document.getElementById('postForm');

export const PostModule = {
  init: function() {
    this.loadPosts();
    postForm.addEventListener('submit', this.handlePostSubmit.bind(this));
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

/* ===== INITIALIZATION ===== */
document.addEventListener('DOMContentLoaded', async () => {
  await FeedModule.init(); // load feed
  PostModule.init();        // enable post creation
  UserModule.init();        // enable profile editing
});