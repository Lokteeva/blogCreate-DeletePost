import React from 'react';
import { useState, useEffect } from 'react';
import { getDocs, collection, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

function Home({ isAuth }, post) {
  //пробую получить один документ из базы

  //добавление данных в базу
  const citiesRef = collection(db, 'sites');

  setDoc(doc(citiesRef, 'SF'), {
    name: 'San Francisco',
    state: 'CA',
    country: 'USA',
    capital: false,
    population: 860000,
    regions: ['west_coast', 'norcal'],
  });
  setDoc(doc(citiesRef, 'LA'), {
    name: 'Los Angeles',
    state: 'CA',
    country: 'USA',
    capital: false,
    population: 3900000,
    regions: ['west_coast', 'socal'],
  });
  setDoc(doc(citiesRef, 'DC'), {
    name: 'Washington, D.C.',
    state: null,
    country: 'USA',
    capital: true,
    population: 680000,
    regions: ['east_coast'],
  });
  setDoc(doc(citiesRef, 'TOK'), {
    name: 'Tokyo',
    state: null,
    country: 'Japan',
    capital: true,
    population: 9000000,
    regions: ['kanto', 'honshu'],
  });
  setDoc(doc(citiesRef, 'BJ'), {
    name: 'Beijing',
    state: null,
    country: 'China',
    capital: true,
    population: 21500000,
    regions: ['jingjinji', 'hebei'],
  });

  //получение данных из базы  по дукоментации
  const docRef = doc(db, 'sites', 'SF');
  const docSnap = getDoc(docRef);

  getDoc(doc(db, 'sites', 'SF')).then((docSnap) => {
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data().name);
    } else {
      console.log('No such document!');
    }
  });

  //my
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, 'posts');

  const getPosts = async () => {
    try {
      const data = await getDocs(postCollectionRef);
      setPostList(
        data.docs.map((post) => ({
          ...post.data(),
          id: post.id,
        })),
      );
    } catch (err) {
      console.log(err);
    }
  };

  //удаление поста
  const deletePost = async (id) => {
    const postDoc = doc(db, 'posts', id);
    await deleteDoc(postDoc);
    getPosts();
  };

  useEffect(() => {
    console.log('Effect called');
    getPosts();
  }, []);

  return (
    <div className="homePage">
      <h1>Мои отчеты</h1>

      <div>
        {postList.map((post) => {
          return (
            <div className="post" key={post.id}>
              {isAuth && post.author.id === auth.currentUser.uid && (
                <>
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
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Home;
