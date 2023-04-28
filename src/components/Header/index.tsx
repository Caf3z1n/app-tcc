import { Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { RiMenuLine } from 'react-icons/ri';
import { Navigation } from "../Navigation";
import { signOut } from "../../contexts/authContext";

export default function Header() {
  const [ isOpen, setIsOpen ] = useState(false);

  function OpenCloseNavigation() {
    setIsOpen(!isOpen)
  }

  return (
    <Flex shadow="md" justifyContent="center" bgColor='#fff'>
      <Flex p="0 4rem" alignItems="center" justifyContent="space-between" w="100%" h="120px" maxW="1480px" bgImg="../header.svg" bgRepeat="no-repeat" >
        <Icon onClick={OpenCloseNavigation} cursor="pointer" as={RiMenuLine} color="cores.preto" fontSize="2rem" />
        <Image src="../logo.svg" alt="logo" w="10rem" />
        <Text />
      </Flex>
      <Navigation isOpen={isOpen} OpenCloseNavigation={OpenCloseNavigation} />
    </Flex>
  )
}
