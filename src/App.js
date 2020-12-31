import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.css';
import Imessage from './Imessage';
import {selectUser, login, logout} from './features/userSlice';
import Login from './Login';
import {auth} from './firebase';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(()=>{
    // 這邊帳號登入後，登入的狀態產生變化
    // 這邊應該也是會自動偵測狀態是否改變，所以不受useEffect影響
    auth.onAuthStateChanged(authUser=> {
      if(authUser){
        // user logged in 
        // authUser可以傳回uid, photoURl等，把需要的東西包裝成物件
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }))
      }else {
        // auth.signOut()就會觸發這邊
        // user is logged out
        dispatch(logout());
      }
    })
  },[]);

  return (
    <div className="app">
      {user ? <Imessage/> : <Login/>}
    </div>
  );
}

export default App;
