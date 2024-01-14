import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'

import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';

const Register = () => {
  const navigate=useNavigate()
  const toast=useToast();
  const [data,setData]=useState({});
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [user, setUser] = useState({
    firstname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const getApi = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      console.error(error)
    }
  };

  useEffect(() => {
    getApi();
  }, []); // 
 








  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
  
    if (user.password !== user.confirmPassword) {
      toast({
        title: 'Password does not match',
        description: 'Password and Confirm Password should be the same',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return; // Prevent further execution if passwords don't match
    }
  
    try {
      const response = await axios.post('http://localhost:8080/user/register', {
        firstname: user.firstname,
        email: user.email,
        password: user.password,
      });
  
      if (response.status === 201) {
        // User registration successful
        toast({
          title: 'User Registration Successfully',
          description: 'Thank You for registering',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setUser({
          firstname: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
       
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // User with the same email already exists
        toast({
          title: 'User Already Exists',
          description: 'User with this email already exists. Please login.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        console.log(error)
        toast({
          title: 'Error',
          description: 'Registration failed. Please try again later.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleClick = () => {
    setShow(!show);
  };

  const handleClick1 = () => {
    setShow1(!show1);
  };

  return (
    <VStack spacing='5px'>
      <FormControl id='first-name' isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder='Enter Your Name'
          name='firstname'
          value={user.firstname}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder='Enter Your Email'
          name='email'
          value={user.email}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id='password' isRequired>
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
      <FormControl id='confirmPassword' isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show1 ? 'text' : 'password'}
            placeholder='Enter Your Confirm Password'
            name='confirmPassword'
            value={user.confirmPassword}
            onChange={handleChange}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick1}>
              {show1 ? 'Hide' : 'Show'}
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
        Sign up
      </Button>
    
    </VStack>
  );
};

export default Register;
