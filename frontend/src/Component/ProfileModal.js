import { ViewIcon } from "@chakra-ui/icons";
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";

const ProfileModal = ({ user, children }) =>{
    const { isOpen, onOpen, onClose } = useDisclosure();
    return<>
    {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }}  icon={<ViewIcon/>} onClick={onOpen} />
      )}

<Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="450px">
          <ModalHeader 
          fontSize="40px"
          fontFamily="Work sans"
        //   d="flex"
        //   justifyContent="center"
        textAlign="center"
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center" 
          >
            <Image
             borderRadius="full"
             boxSize="175px"
             mb="30px"
             src={user.pic}
             alt={user.name}
            />
            <Text>{user.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
}

export default ProfileModal;