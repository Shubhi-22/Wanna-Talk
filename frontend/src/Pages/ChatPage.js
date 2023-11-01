import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import Sidebar from "../Component/Sidebar";
import { Box } from "@chakra-ui/react";
import Chats from "../Component/Chats";
import ChatBox from "../Component/ChatBox";


const ChatPage = () => {
    const {user}=ChatState();
    const [fetchAgain, setFetchAgain]=useState(false);
   
    return <><div style={{width:"100%"}}>
    {user && <Sidebar/>}
    <Box
  display="flex"
  justifyContent="space-between"
  padding="10px"
  height="91.5vh"
  width="100%"
>
  {user && <Chats fetchAgain={fetchAgain}/>}
  {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
</Box>  
    </div></>
};

export default ChatPage;