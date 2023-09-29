import React from 'react'
import { useState, useEffect } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db, auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

function CreatePost({isAuth}) {
  //для того, чтобы инпуты отслеживали ввод
  const [title, setTitle] = useState("")
  const [postText, setPostText] = useState("")
  const [datePost, setDatePost] = useState("")
  const [nameD, setNameD] = useState("")


  let navigate = useNavigate()
  //для отправки сообщений в firebase
  const  postCollectionRef = collection(db, "posts")
  const createPost = async() =>{
    await addDoc(postCollectionRef, {
      nameD, datePost, title, postText, author:{name: auth.currentUser.displayName, id:auth.currentUser.uid}, 
    });
    navigate("/");
  }


  //для аутинтификации пользователя
  useEffect(() =>{
    if (!isAuth) {
    navigate("/login");

    }
  });

   return (
    <div className='createPostPage'>
     <div className='cpContainer'>
     <h1>create post</h1>
     <div className='inputGp'>
      <label>Духовное имя:</label>
      <input placeholder='Духовное имя...' onChange={(event)=>{
        setNameD(event.target.value);
      }}/>
     </div>
     <div className='inputGp'>
      <label>Дата:</label>
      <input placeholder='Дата...' onChange={(event)=>{
        setDatePost(event.target.value);
      }}/>
     </div>
     <div className='inputGp'>
      <label>Заголовок:</label>
      <input placeholder='Заголовок' onChange={(event)=>{
        setTitle(event.target.value);
      }}/>
     </div>
     <div className='inputGp'>
      <label>Ответ:</label>
      <textarea placeholder="Ответ..." onChange={(event)=>{
        setPostText(event.target.value);
      }}/>
     </div>
     <button onClick={createPost}>Submit Post</button>
     </div>

     

    </div>
  )
}

export default CreatePost


