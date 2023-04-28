import { Flex, Stack, Button, Image, Text, Container }  from '@chakra-ui/react';
import Router from 'next/router';

import { withSSRGuest } from '../../utils/withSSRGuest';

export default function Seletor() {
  return (
    <Flex
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        as="form"
        width="100%"
        maxW="25rem"
        p="2rem"
        bg="cores.branco"
        borderRadius="0.5rem"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
        border="2px"
        borderColor="cores.cinzaBorda"
        shadow="lg"
      >
        <Image src="logo.svg" alt="logo" w="10rem" mb="3rem" />
        <Text mb="3rem" fontWeight="bold" fontSize="2rem" textAlign="center">Como deseja se cadastrar?</Text>
        <Stack spacing="1rem" width="100%">
          <Button
            type="button"
            bgColor="cores.laranja"
            color="cores.branco"
            size="lg"
            _hover={{
              bg: 'cores.laranjaEscuro'
            }}
            _active={{
              bg: 'cores.laranjaEscuro2'
            }}
            _focus={{
              boxShadow: 'none'
            }}
            onClick={() => Router.push('/cadastro/espectador')}
          >
            ESPECTADOR
          </Button>
          <Button
            type="button"
            bgColor="cores.laranja"
            color="cores.branco"
            size="lg"
            _hover={{
              bg: 'cores.laranjaEscuro'
            }}
            _active={{
              bg: 'cores.laranjaEscuro2'
            }}
            _focus={{
              boxShadow: 'none'
            }}
            onClick={() => Router.push('/cadastro/palestrante')}
          >
            PALESTRANTE
          </Button>
          <Button
            type="button"
            bgColor="cores.branco"
            color="cores.laranja"
            border="2px"
            size="lg"
            _hover={{
              bgColor: "rgba(0, 0, 0, 0.04)",
              color: 'cores.laranjaEscuro'
            }}
            _active={{
              bgColor: "rgba(0, 0, 0, 0.06)",
              color: 'cores.laranjaEscuro2'
            }}
            _focus={{
              boxShadow: 'none'
            }}
            onClick={() => Router.push('/')}
          >
            VOLTAR
          </Button>
        </Stack>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});
