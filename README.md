# MoodPalette
MoodPalette is a social media-style web application that allows users to create, view and interact with posts. The application includes user profile customization, dynamic post rendering and real-time search functionality. It focuses on modular design, user experience and interactive UI behavior.

## Features

### 1. User Profile System
- Change username dynamically  
- Upload a profile picture from the device  
- Profile data persists using *localStorage*, retaining changes after page reload  

### 2. Dynamic Feed System
- Posts fetched via a REST API and rendered dynamically  
- Users can:
  - View posts  
  - Like posts (UI interaction)  
  - Delete posts  

### 3. Real-Time Search and Filtering
- Instant search for posts using string matching:
```javascript
post.title.toLowerCase().includes(query)

### 4. Modular Code Structure
Separated into modules:
UserModule
FeedModule
PostModule
Services (API & storage)
Utilities (DOM helpers
)
### 5. UI/UX Design
Clean, modern layout
Responsive for different screen sizes
Interactive elements (hover effects, buttons, forms)

### 6. Technologies Used
Languages: HTML, CSS, JavaScript (ES6)
APIs: Fetch API for GET, POST, DELETE requests
Persistence: LocalStorage for client-side data
Design: Flexbox, media queries, responsive CSS
Structure: ES6 Modules for modular code
### 7. Tools Used
VS Code – code editor
Live Server – for running the project locally
Chrome / Firefox Developer Tools – debugging and inspecting UI
Git & GitHub – version control and repository management
