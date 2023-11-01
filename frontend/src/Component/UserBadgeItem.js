import { CloseIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

const UserBadgeItem=({user, handleFunction})=>{
    return<>
    <Flex>

    <Box
    px={2}
    py={1}
    borderRadius="lg"
    m={1}
    mb={2}
    variant="solid"
    fontSize={12}
    width={20}
    color="white"
    backgroundColor="teal"
    cursor="pointer"
    onClick={handleFunction}
    >
    {user.name}
    <CloseIcon pl={1}/>
    </Box>
    </Flex>
    </>
}

export default UserBadgeItem;