import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    const createPost = () => {
        if (title.trim() === '' || content.trim() === '') {
            alert('Title and Content are required!');
            return;
        }

        axios.post('http://localhost:5000/posts', { title, content })
            .then(response => {
                setPosts([...posts, response.data]);
                setTitle('');
                setContent('');
            })
            .catch(error => console.error('Error creating post:', error));
    };

    const deletePost = (id) => {
        axios.delete(`http://localhost:5000/posts/${id}`)
            .then(() => {
                setPosts(posts.filter(post => post.id !== id));
            })
            .catch(error => console.error('Error deleting post:', error));
    };

    const addComment = (id, comment) => {
        if (comment.trim() === '') {
            alert('Comment cannot be empty!');
            return;
        }

        axios.post(`http://localhost:5000/posts/${id}/comments`, { comment })
            .then(response => {
                setPosts(posts.map(post => post.id === id ? response.data : post));
            })
            .catch(error => console.error('Error adding comment:', error));
    };

    return (
        <div>
            <h1>My Blog</h1>
            <div>
                <input 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Title" 
                />
                <textarea 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    placeholder="Content">
                </textarea>
                <button onClick={createPost}>Create Post</button>
            </div>
            <hr />
            <div>
                {posts && posts.length > 0 ? (
                    posts.map(post => (
                        <div key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            <button onClick={() => deletePost(post.id)}>Delete</button>
                            <div>
                                <h4>Comments:</h4>
                                {post.comments && post.comments.length > 0 ? (
                                    post.comments.map((comment, index) => (
                                        <p key={index}>{comment}</p>
                                    ))
                                ) : (
                                    <p>No comments yet.</p>
                                )}
                                <input 
                                    placeholder="Add a comment" 
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            addComment(post.id, e.target.value);
                                            e.target.value = '';  // Clear input after adding comment
                                        }
                                    }} 
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No posts available.</p>
                )}
            </div>
        </div>
    );
}

export default App;
