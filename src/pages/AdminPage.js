import React from 'react';
import { useState, useEffect } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';

function AdminPage({ isAuth }) {
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, 'posts');

  // const deletePost = async (id) => {
  //   const postDoc = doc(db, 'posts', id);
  //   await deleteDoc(postDoc);
  //   window.location.reload();
  // };

  //для извлечения инфы из firebase сразу после рендера
  // useEffect(() => {
  //   const getPosts = async () => {
  //     const data = await getDocs(postsCollectionRef);
  //     setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  //   getPosts();
  // }, [deletePost]);

  const getPosts = async () => {
    try {
      const data = await getDocs(postCollectionRef);
      setPostList(
        data.docs.map((post) => ({
          ...post.data(),
          id: post.id,
        }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  //удаление поста
  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    getPosts();
  };

  useEffect(() => {
    console.log("Effect called");
    getPosts();
  }, []);


  return (
    <div className="homePage">
      <h1>Все отчеты</h1>

      <div>
        {postList.map((post) => {
          return (
            <div className="post" key={post.id}>
              <div className="postHeader">
                <h3>{post.nameD}</h3>
                <h5>Дата: {post.datePost}</h5>
                <div className="title">
                  <h2>{post.title}</h2>
                </div>
              </div>
              <div className="postTextContainer">{post.postText}</div>

              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}>
                    удалить
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminPage;
