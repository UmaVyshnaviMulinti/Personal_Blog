import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPosts } from '../api';

function Category() {
  const [posts, setPosts] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    getPosts().then(response => {
      setPosts(response.data.filter(post => post.category === category));
    }).catch(error => {
      console.error(error);
    });
  }, [category]);

  return (
    <div>
      <h1>Posts in {category}</h1>
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <a href={`/post/${post._id}`}>Read more</a>
          </div>
        ))
      ) : (
        <p>No posts found in this category.</p>
      )}
    </div>
  );
}

export default Category;
