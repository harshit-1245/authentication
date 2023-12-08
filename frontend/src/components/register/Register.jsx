import React, { useState } from 'react';
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
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [user, setUser] = useState({
    firstname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const submitHandler = () => {
    // Access user properties here for form submission
    console.log('User:', user);
    // Add your form submission logic here
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
