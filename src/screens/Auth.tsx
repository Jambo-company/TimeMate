import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  AuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from 'firebase/auth'
import { auth } from '../firebase'
import { AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Background = styled.div`
  width: 430px;
  height: 520px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  @media (max-width: 461px) {
    width: 100px;
  }
`

const Shape = styled.div`
  height: 200px;
  width: 200px;
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(#1845ad, #23a2f6);
  left: -100px;
  top: -120px;
  background-size: cover;
  background-position: center center;

  @media (max-width: 461px) {
    width: 100px;
    height: 100px;
    position: absolute;
    left: -150px;
    top: -70px;
  }

  @media (min-width: 461px) and (max-width: 1024px) {
    width: 150px;
    height: 150px;
    left: -50px;
    top: -70px;
  }
`
const ShapeB = styled.div`
  height: 200px;
  width: 200px;
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(to right, #ff512f, #f09819);
  right: -75px;
  background-size: cover;
  bottom: -120px;
  background-position: top left;
  @media (max-width: 461px) {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 153px;
    bottom: -50px;
  }

  @media (min-width: 461px) and (max-width: 1024px) {
    width: 150px;
    height: 150px;
    left: 327px;
    bottom: -70px;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 520px;
  width: 400px;
  background-color: rgba(255, 255, 255, 0.13);
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 50px 35px;
  @media (max-width: 461px) {
    width: 250px;
    height: 450px;
  }
  //tablet
  @media (min-width: 461px) and (max-width: 1024px) {
    width: 350px;
    height: 450px;
  }
`

const FormHeader = styled.h3`
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
  color: white;
  margin-bottom: 20px;
`
const FormInput = styled.input`
  display: block;
  height: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 13px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
  color: white;
  margin-bottom: 30px;
  ::placeholder {
    color: white;
    font-size: 15px;
    font-weight: 600;
  }
`

const FormLoginBtn = styled.input`
  margin-top: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.27);
  color: white;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 13px;
  outline: none;
  border: none;
  margin-bottom: 40px;
  cursor: pointer;
`
const FormSocialLoginBtn = styled(motion.div)<{ name: string }>`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 150px;
  border-radius: 10px;
  padding: 5px 10px 10px 5px;
  background-color: rgba(255, 255, 255, 0.27);
  color: #eaf0fb;
  text-align: center;
  cursor: pointer;

  :hover {
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,
      rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
      rgba(0, 0, 0, 0.07) 0px 16px 16px;
    border: 2px solid white;
    transition-delay: 2s ease-in-out;
  }
`
const FormSocialLoginSpan = styled.span`
  font-size: 19px;
  margin-left: -10px;
  color: white;
`

interface ILogInProp {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const Auth = ({ isLoggedIn, setIsLoggedIn, setUser }: ILogInProp) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [newAccount, setNewAccount] = useState(true)
  const [error, setError] = useState('')

  const navigation = useNavigate()
  useEffect(() => {
    if (isLoggedIn) {
      navigation('/')
    }
  }, [isLoggedIn])

  const onFormChange = (event: any) => {
    console.log(event.target.name)
    const {
      target: { name, value },
    } = event
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }
  const onSubmit = async (event: any) => {
    event.preventDefault()

    try {
      let authUser: User | null
      if (newAccount) {
        // @ts-ignore
        await createUserWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            authUser = userCredential.user
            setUser(authUser)
          }
        )
      } else {
        // @ts-ignore
        await signInWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            authUser = userCredential.user
            setUser(authUser)
          }
        )
      }
      setIsLoggedIn(true)
    } catch (error: any) {
      setError(error.message)
    }
  }
  const toggleAccount = () => setNewAccount((prev) => !prev)
  const SocialLogin = async (event: any) => {
    const {
      target: { name },
    } = event
    console.log(name)

    let provider: AuthProvider
    provider = new GoogleAuthProvider()

    const data = await signInWithPopup(auth, provider!)
    setIsLoggedIn(true)
    setUser(data.user)
  }

  return (
    <>
      <Background>
        <Shape />
        <ShapeB />
      </Background>
      <Form onSubmit={onSubmit}>
        <FormHeader>Welcome Login Here</FormHeader>
        <FormInput
          type="text"
          name="email"
          placeholder="Sign Up With Your Email"
          value={email}
          onChange={onFormChange}
          required
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={onFormChange}
          required
        />
        <FormLoginBtn
          type="submit"
          value={newAccount ? 'Create A New Account' : 'Login'}
        />
        <AnimatePresence>
          <FormSocialLoginBtn
            onClick={SocialLogin}
            name="google"
            whileTap={{ scale: 0.8 }} whileHover={{scale:1.1}}>
            <FontAwesomeIcon icon={faGoogle} color="white" size="2x" />
            <FormSocialLoginSpan>Google</FormSocialLoginSpan>
          </FormSocialLoginBtn>
        </AnimatePresence>
      </Form>
    </>
  )
}

export default Auth
