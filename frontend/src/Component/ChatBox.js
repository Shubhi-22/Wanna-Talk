import React from "react"
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import "./ChatBox.css";
import SingleChat from "./SingleChat";

const ChatBox = ({fetchAgain, setFetchAgain}) =>{
    const { selectedChat } = ChatState()
    console.log("ChatBox rendered with selectedChat:", selectedChat);
    const isSmallScreen = window.innerWidth <= 768;
    const displayClass = isSmallScreen && !selectedChat ? "chat-box-small-screen" : "";
    // const displayValue = selectedChat.isGroupChat ? "flex" : "none";
    return (
        <Box className={displayClass}
        alignItems="center"
        flexDir="column"
        p={3}
        bg="white"
        w={{ base: "100%", md: "68%" }}
        borderRadius="lg"
        borderWidth="1px"
        >
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
        </Box>
    )
}

export default ChatBox;