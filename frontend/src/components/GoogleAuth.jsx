import { Button } from 'flowbite-react'
import React from 'react'
import {AiFillGoogleCircle} from 'react-icons/ai'
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import { app } from '../firebase';
import {useDispatch} from 'react-redux'
import { successSignIn, startSignIn, failureSignIn } from '../app/user/userSlice';
import { useNavigate } from "react-router-dom";

export default function GoogleAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({prompt:'select_account'})

    try{
      const result = await signInWithPopup(auth, provider)
      
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers:{'Content-Type':'applications/json'},
        body:JSON.stringify({
          name:result.user.displayName,
          email:result.user.email,
          googlePhotoUrl:result.user.photoURL
        })
      })

      const data = await response.json();
      if(response.ok){
        dispatch(successSignIn(data))
        navigate('/')
      }
    } catch(err){
      console.log(err)
    }
  }

  return (
    <Button type='button' gradientDuoTone='purpleToPink' outline onClick={clickGoogleLogin}>
      <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
      Zaloguj się za pomocą Google
    </Button>
  )
}
