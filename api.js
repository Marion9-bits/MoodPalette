const API_BASE = 'https://jsonplaceholder.typicode.com'; 

// API service module
// Handles GET, POST, PUT, DELETE requests

const API = {
  getPosts: async function(limit = 5) {
    try {
      const response = await fetch(`${API_BASE}/posts?_limit=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      return await response.json();
    } catch (error) {
      console.error('Error in getPosts:', error);
      return [];
    }
  },

  createPost: async function(postData) {
    try {
      const response = await fetch(`${API_BASE}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });
      if (!response.ok) throw new Error('Failed to create post');
      return await response.json();
    } catch (error) {
      console.error('Error in createPost:', error);
      return null;
    }
  },

  updatePost: async function(postId, postData) {
    try {
      const response = await fetch(`${API_BASE}/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });
      if (!response.ok) throw new Error('Failed to update post');
      return await response.json();
    } catch (error) {
      console.error('Error in updatePost:', error);
      return null;
    }
  },

  deletePost: async function(postId) {
    try {
      const response = await fetch(`${API_BASE}/posts/${postId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete post');
      return true;
    } catch (error) {
      console.error('Error in deletePost:', error);
      return false;
    }
  }
};
export {API};