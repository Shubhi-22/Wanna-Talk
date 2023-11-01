import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender ,getSenderFull} from "../config/ChatLogics";
import ProfileModal from "./ProfileModal";
import UpdateGroupCharModal from "./UpdateGroupCharModal";
import axios from "axios";
import './style.css';
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import Lottie from 'react-lottie';
import animationData from "../animations/typing.json";


const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain, fetchMessages: propFetchMessages }) => {
    
    
    const { user, selectedChat,setSelectedChat,notification,setNotification} = ChatState();
    const [message, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();
    const [socketConnected, setSocketConnected]=useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const toast =useToast();

    const defaultOptions={
        loop:true,
        autoplay: true,
        animationData: animationData,
        rendererSettings:{
            preserveAspectRatio: "xMidYMid slice",
        }
    }
    
    
    useEffect(()=>{
        socket = io(ENDPOINT);
        socket.emit("setup",user);
        socket.on('connected',()=>setSocketConnected(true));
        socket.on('typing',()=>setTyping(true))
        socket.on('stop typing',()=>setIsTyping(true))

    },[])
    const typingHandler = (e) =>{
        setNewMessage(e.target.value);

        // TypingIndicatorLogic
        if(!socketConnected) return;

        if(!typing){
            setTyping(true);
            socket.emit('typing',selectedChat._id);
        }
        let lastTypingTime = new Date().getTime()
        var timerLength = 3000;
        setTimeout(()=>{
          var timeNow = new Date().getTime();
          var timeDiff = timeNow - lastTypingTime;

          if(timeDiff >= timerLength && typing){
            socket.emit('stop typing', selectedChat._id);
            setTyping(false);
          }
        },timerLength)
    }

    const fetchMessages =async()=>{
        if(!selectedChat) return;
        try{
            const config={
                headers:{
                    Authorization:`Bearer ${user.token}`,
                },
            };
            setLoading(true);
            const {data}= await axios.get(`/api/message/${selectedChat._id}`,config);
            
            setMessages(data);
            setLoading(false);


            //socket.io
            socket.emit('join chat', selectedChat._id);

        }catch(error){
            toast({
                title: "Error Occured",
                description: "Failed to fetch Message",
                status: "error",
                duration: 5000,
                isClosable: true,
                position:"bottom",
            })
        }
    }

    useEffect(()=>{
        fetchMessages();
        selectedChatCompare = selectedChat;

    },[selectedChat]);

    
    useEffect(()=>{
        socket.on("message received",(newMessageReceived)=>{
            if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id ){
                //give notification
                if(!notification.includes(newMessageReceived)){
                    setNotification([newMessageReceived, ...notification])
                    setFetchAgain(!fetchAgain);
                }

            } else{
                setMessages([...message,newMessageReceived]);
            }
        })

    })


    const sendMessage=async(event)=>{
        if(event.key==="Enter" && newMessage){
            socket.emit("stop typing",selectedChat._id);
            try{
                const config={
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${user.token}`,
                    },
                };

                setNewMessage("");
                const {data} =await axios.post('/api/message',{
                    content: newMessage,
                    chatId: selectedChat._id,
                },
                config);

                
                socket.emit("new message",data)

                setMessages([...message,data]);

            }catch(error){
                toast({
                    title: "Error Occured",
                    description: "Failed to send the Message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position:"bottom",
                });

            }
        }

    }


    
    
    return <>{
        selectedChat? (
            <>
            <Text
            fontSize={{ base: "28px", md:"30px"}}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between", md: "flex-start" }}
            alignItems="center"
            >

                <IconButton d={{ base: "inline-flex", md: "none"}}
                  icon={<ArrowBackIcon />}
                  onClick={()=>setSelectedChat("")}
                />
                {!selectedChat.isGroupChat ? (
                    <>
                    {getSender(user,selectedChat.users)}
                    <ProfileModal user={getSenderFull(user, selectedChat.users)}/>
                    </>
                ): (
                    <>{selectedChat.chatName.toUpperCase()}
                    <UpdateGroupCharModal
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    fetchMessages={fetchMessages}
                    />
                    </>
                )}
            </Text>
            <Box display="flex"
                 flexDirection="column"
                 justifyContent="flex-end" // Center vertically
                 // Center horizontally
                 padding={3}
                 background="#E8E8E8"
                 width="100%"
                 height="auto"
                //  height="588px"
                 borderRadius="lg"
                 overflowY="hidden"
            >
            {loading? (
                <Spinner
                 size="xl"
                 w={20}
                 h={20}
                 alignItems="center"
                margin="auto"
                 />
            ):(
                <div className="messages" >
                   <ScrollableChat message={message}/>
                </div>
            )}    

            <FormControl
             onKeyDown={sendMessage} 
             isRequired
            //  mt={450}
            >
                {isTyping?<div><Lottie
                options={defaultOptions}
                width={49}
                height={23}
                style={{marginTop:"5px", marginLeft: 0}}
                /></div>:<></>}
                <Input 
                  variant="filled"
                  bg="#E0E0E0"
                  placeholder="Enter a message..."
                  onChange={typingHandler}
                  value={newMessage}
                ></Input>
                
            
            </FormControl> 
             
            </Box>
            </>
        ):(
            <Box d="flex" alignItems="center" justifyContent="center" h="100%" w="100%">
            <Text fontSize="3xl" pb={3} fontFamily="Work sans">
              Click on the user to start chatting
            </Text>
          </Box>
        )
    }
    </>
}

export default SingleChat;