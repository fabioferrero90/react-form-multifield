import NewPost from "./components/NewPost";
import PostList from "./components/PostList";
import postList from "./data/posts";
import { useState } from 'react';

function App() {
  const [posts, setPosts] = useState(postList);

  function addPost(newPost) {
    setPosts([...posts, newPost]);
  }

  function removePost(postId) {
    setPosts(posts.filter((post) => post.id !== postId));
  }

  function updatePost(postId, updatedPost) {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          titolo: updatedPost.title,
          contenuto: updatedPost.content,
          autore: updatedPost.author
        };
      }
      return post;
    }));      
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <NewPost addFunc={addPost} posts={posts}/>
        <PostList posts={posts} removeFunc={removePost} updateFunc={updatePost} />
      </div>
    </div>
  );
}

export default App;