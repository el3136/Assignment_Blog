import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';


function CreatePost({ isAuth }) {
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');

  const postCollectionRef = collection(db, 'posts');
  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postCollectionRef, { 
      title, 
      postText, 
      author: {name: auth.currentUser.displayName, id: auth.currentUser.uid },
      submission: {name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    // submission changes when another person besides the user submits it
    navigate('/');
  }

  // check if the user is logged in each time this page is loaded when they enter this page.
  useEffect(() => {
    if (!isAuth) {
        navigate('/login');
    }
  }, []);
  

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label> Title:</label>
          <input 
            placeholder="Assignment Title..." 
            onChange={(event) => {
              setTitle(event.target.value)
            }} 
          />
        </div>
        <div className="inputGp">
          <label> Post:</label>
          <textarea 
            placeholder="Assignment Details..." 
            onChange={(event) => {
              setPostText(event.target.value)
            }} 
          />
        </div>
        <button onClick={createPost}> Submit Post </button>
      </div>
    </div>
  );
}

export default CreatePost