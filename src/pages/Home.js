import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db, auth } from '../firebase-config';

function Home({isAuth}) {
    // access the list of all the posts
  const [postList, setPostList] = useState([]);

  const postCollectionRef = collection(db, 'posts');

  const deletePost = async (id) => {
    // already checked if the post belongs to the user
    const postDoc = doc(db, 'posts', id);
    await deleteDoc(postDoc);
  }

  const submitPost = async (id) => {
    // change the posts.submission to the account that submitted to it
    const postDoc = doc(db, 'posts', id);
    const newField = {submission: {name: auth.currentUser.displayName, id: auth.currentUser.uid }};
    await updateDoc(postDoc, newField);
  }
  
  useEffect(() => {
    const getPosts = async () => {
        const data = await getDocs(postCollectionRef);
        // console.log(data);
        // console.log(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        // Problem: setPostList(data.docs.map((doc) => ({...doc.data, id: doc.id})));
        // Solution ...doc.data -> ...doc.data()
    };

    getPosts();
  }, [deletePost]);
  
  return (
    <div className='homePage'>
      <h1> Assignments </h1>
      {postList.map((post) => {
        return (
          <div className='post'>
            <div className='postHeader'>
              <div className='title'>
                <h1> {post.title} </h1>
              </div>
            </div>

            {isAuth && (auth.currentUser.uid === post.author.id) && (
              <div className='deletePost'>
                <button onClick={() =>{ deletePost(post.id);}}>
                  &#128465; 
                </button>  
              </div>
            )}
            
            <div className='postTextContainer'>
              {post.postText}  
            </div>
            <h3>Assignment Author: {post.author.name}</h3>

            <h4> 
            Submitter: {post.author.id === post.submission.id ? 'None' : post.submission.name} 
            </h4>

            {/* Is authorized, user is not poster, no one has submitted yet */}
            {/* Problem: (post.author.id === post.submission.id) 
                Reason: the previous posts don't have the field 'submission'
            */}
            {isAuth && (
              auth.currentUser.uid !== post.author.id) && (
              post.author.id === post.submission.id) && (
                <button onClick={() => { submitPost(post.id) }}>
                  Submit Assignment
                </button>
            )}
          </div>
        );
      })}  
    </div>
  )
}

export default Home
