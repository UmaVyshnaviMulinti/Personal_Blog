import React, { useState, useEffect } from 'react';
import { getPosts } from '../api';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(response => {
      setPosts(response.data);
    }).catch(error => {
      console.error(error);
    });
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <a href={`/post/${post._id}`}>Read more</a>
        </div>
      ))}
    </div>
  );
}

export default Home;
