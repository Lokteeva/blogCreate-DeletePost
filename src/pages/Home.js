import React from 'react';
import { useState, useEffect } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';

function Home({ isAuth}) {
  const [postList, setPOstList] = useState([]);
  const postCollectionRef = collection(db, 'posts');

  //для извлечения инфы из firebase сразу после рендера
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      setPOstList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  });

  //удаление поста
  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc)
  }
  console.log()

  
  return (
    <div className="homePage">
      <h1>Отчет для наставника</h1>
    
      <div>
        {postList.map((post) => {
          return (
            <div className="post">
              <div className="postHeader">
              <h6>@{post.author.name}:</h6>
              <h3>{post.nameD}</h3>
              <h5>Дата: {post.datePost}</h5>
                <div className="title">
                  <h2>{post.title}</h2>
                </div>               
              </div>
              <div className="postTextContainer">{post.postText}</div>

              <div className='deletePost'>
                  {isAuth && post.author.id === auth.currentUser.uid &&<button onClick={()=>{deletePost(post.id)}}>удалить</button>}
                </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;



