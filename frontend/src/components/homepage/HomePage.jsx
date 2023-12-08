import React from 'react';
import { Container, Box, Text } from '@chakra-ui/react';
import {TabList,TabPanel,TabPanels,Tabs,Tab} from "@chakra-ui/react"
import Login from "../login/Login"
import Register from "../register/Register"

const HomePage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        alignItems="center" 
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
        fontSize="4xl"
        fontFamily="Work Sans"
        color="black"
        textAlign="center"
        >Full Authentication</Text>
      </Box>
      <Box bg="white" w="100%" borderRadius="lg" borderWidth="1px">
      <Tabs variant='soft-rounded'>
  <TabList mb="1em">
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Sign up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login/>
    </TabPanel>
    <TabPanel>
      <Register/>
    </TabPanel>
  </TabPanels>
</Tabs>
      </Box>
     
    </Container>
  );
};

export default HomePage;
