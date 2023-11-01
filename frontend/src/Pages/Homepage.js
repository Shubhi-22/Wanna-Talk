import { Container,Box,Text,Tabs,TabList,TabPanels,Tab,TabPanel} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Register from "../Component/Register";
import Login from "../Component/Login";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
    const navigate= useNavigate();

    useEffect(()=>{
        const user =JSON.parse(localStorage.getItem("userInfo"));
        if(user){
            navigate("/chats");
        }
    },[navigate]);


    return <>
        <Container maxW='xl' centerContent>
        <Box
         d="flex"
         justifyContent="center"
         p={3}
         bg={"white"}
         w="100%"
         m="40px 0 15px 0"
         borderRadius="lg"
         borderWidth="1px"
        >
        <Text fontSize="4xl" fontFamily="Work sans" color="black">Wanna Talk!</Text> 
        </Box>  
        <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant='enclosed'>
        <TabList mb="1em">
            <Tab width="50%">Register</Tab>
            <Tab width="50%">Login</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
            <Register/>
            </TabPanel>
            <TabPanel>
            <Login/>
            </TabPanel>
        </TabPanels>
        </Tabs>    
        </Box>      
        </Container></>
};

export default Homepage;