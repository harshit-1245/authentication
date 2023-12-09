import React from 'react';
import { Button, Center } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import {useCookies} from 'react-cookie'


const Home = () => {
  const toast=useToast();
  const navigate=useNavigate();
  const [cookies,setCookies]=useCookies(["access_token"]);
 
  const handleLogout=()=>{
  setCookies("access_token","");
  window.localStorage.removeItem("userID");
  toast({
    title: 'Logout Successful',
    description: 'Come Again',
    status: 'success',
    duration: 3000,
    isClosable: true,
  });
  navigate('/')
  }
  
  

  return (
    <Center h="100vh">
      {!cookies.access_token?(
         navigate('/')
      ):(
        <Button colorScheme='red' size='lg' onClick={handleLogout}>
        Logout
      </Button>
      )}
    
    </Center>
  );
};

export default Home;
