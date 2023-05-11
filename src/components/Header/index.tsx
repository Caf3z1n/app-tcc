import { Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { RiMenuLine } from 'react-icons/ri';
import { usePalestrasAgora } from "../../services/hooks/usePalestrasAgora";
import { Navigation } from "../Navigation";
import { Router, useRouter } from 'next/router';

type HeaderProps = {
  listaPalestras?: boolean
}

export default function Header({ listaPalestras = true }: HeaderProps) {
  const router = useRouter();
  const [ isOpen, setIsOpen ] = useState(false);

  const { data, isLoading } = usePalestrasAgora()

  function OpenCloseNavigation() {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Flex shadow="md" justifyContent="center" bgColor='#fff'>
        <Flex p="0 4rem" alignItems="center" justifyContent="space-between" w="100%" h="120px" maxW="1480px" bgImg="../header.svg" bgRepeat="no-repeat" >
          <Icon onClick={OpenCloseNavigation} cursor="pointer" as={RiMenuLine} color="cores.preto" fontSize="2rem" />
          <Image src="../logo.svg" alt="logo" w="10rem" />
          <Text />
        </Flex>
        <Navigation isOpen={isOpen} OpenCloseNavigation={OpenCloseNavigation} />
      </Flex> 
      {
        !isLoading && !!data && data.palestras.length >= 1 && listaPalestras && (
          data.palestras.map((palestra) => {
            return (
              <>
              <Flex justifySelf="center" justifyContent="center" mt="2rem">
                <Flex flexDirection="column" bg="#FFF" p="2rem" shadow="sm" border="2px" borderColor="cores.cinzaBorda" borderRadius="0.5rem">
                  <Text mt="-1rem" ml="-1rem" fontWeight="bold" color="red" mb="0.5rem">PALESTRA - AO VIVO</Text>
                  <Flex justifyContent="space-between" textAlign="center" alignItems="center">
                    <Text fontWeight="medium" fontSize="1.2rem" mr="3rem">{palestra.palestra.nome}</Text>
                    <Button
                      type="button"
                      colorScheme="green"
                      color="cores.branco"
                      size="md"
                      _focus={{
                        boxShadow: 'none'
                      }}
                      onClick={() => router.push(`/assistir-palestra/${palestra.palestra.id}`)}
                    >
                      Assistir 
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
              </>
            )
          })   
        )
      }
    </>
  )
}
