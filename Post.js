import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../api';

function Post() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getPostById(id).then(response => {
      setPost(response.data);
    }).catch(error => {
      console.error(error);
    });
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Category: {post.category}</p>
    </div>
  );
}

export default Post;
