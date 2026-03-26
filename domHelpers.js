// Helper to create post DOM elements

export function createPostElement(post) {
  const postDiv = document.createElement('div');
  postDiv.classList.add('post');
  postDiv.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.body}</p>
    <div class="post-actions">
      <button class="like-btn">Like</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  // Like button
  const likeBtn = postDiv.querySelector('.like-btn');
  likeBtn.addEventListener('click', () => {
    likeBtn.textContent = 'Liked';
    likeBtn.disabled = true;
  });

  // Delete button (optional, mock API)
  const deleteBtn = postDiv.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', async () => {
    const success = await API.deletePost(post.id);
    if (success) postDiv.remove();
  });

  return postDiv;
}