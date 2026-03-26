// User profile module
import { API } from '../services/api.js';
import { saveToStorage, loadFromStorage } from '../services/storage.js';

const profilePicEl = document.getElementById('profile-pic');
const usernameEl = document.getElementById('username');

export const UserModule = {
  user: {
    username: 'Guest',
    profilePic: 'assets/images/default-profile.png'
  },

  init: function() {
    this.loadUser();
    this.setupEvents();
  },

  loadUser: function() {
    
    const savedUser = loadFromStorage('moodpalette-user');
    if (savedUser) {
      this.user = savedUser;
      this.render();
    } else {
      this.render();
    }
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
    const newPic = prompt('Please enter a URL for yournew profile picture:');
    if (newPic) {
      this.user.profilePic = newPic;
      this.render();
      saveToStorage('moodpalette-user', this.user);
    }
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