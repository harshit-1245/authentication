import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import {useCookies} from 'react-cookie'
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [_, setCookies] = useCookies(["access_token"]);
  const [loading, setLoading] = useState(false); // Add loading state

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleClick = () => {
    setShow(!show);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true during the API request

    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        email: user.email,
        password: user.password,
      });

      if (response.status === 200) {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.user._id);
        navigate("/homepage");
      }
    } catch (error) {
      if (error.response) {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Login Failed",
          description: "An error occurred. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } finally {
      setLoading(false); // Set loading back to false after API request
    }
  };
  return (
    <VStack spacing='5px'>
    
    <FormControl id='email-login' isRequired>
      <FormLabel>Email</FormLabel>
      <Input
        placeholder='Enter Your Email'
        name='email'
        value={user.email}
        onChange={handleChange}
      />
    </FormControl>
    <FormControl id='password-login' isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup>
        <Input
          type={show ? 'text' : 'password'}
          placeholder='Enter Your Password'
          name='password'
          value={user.password}
          onChange={handleChange}
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
   

    <Button
      colorScheme='blue'
      width='100%'
      style={{ marginTop: 15 }}
      onClick={submitHandler}
    >
     Login
    </Button>
  </VStack>
  )
}

export default Login

// toast({
//   title: 'Account created.',
//   description: "We've created your account for you.",
//   status: 'success',
//   duration: 9000,
//   isClosable: true,
// })
