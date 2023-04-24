import { Flex, Image, Button, Text, Grid } from '@chakra-ui/react'
import Router from 'next/router';
import HomeEvent from '../components/HomeEvent';
import { useHomeEventos } from '../services/hooks/useHomeEventos';

import { withSSRGuest } from '../utils/withSSRGuest';

export default function Home() {

  const { data, isLoading } = useHomeEventos();

  return (
    <Flex flexDir="column" justifyItems="center" alignItems="center">
      <Flex maxW="1480px" w="100%" flexDirection="column" p="1rem 2rem">
        <Flex mb="4rem" w="100%" justifyContent="space-between" alignItems="center">
          <Image src="logo.svg" alt="logo" w="10rem" />
          <Flex>
            <Button
              type="button"
              bgColor="rgba(255, 255, 255, 0.01)"
              color="cores.preto"
              size="md"
              mr="1rem"
              _hover={{
                bgColor: "rgba(255, 255, 255, 0.01)",
              }}
              _active={{
                bg: 'rgba(255, 255, 255, 0.01)'
              }}
              _focus={{
                boxShadow: 'none'
              }}
              onClick={() => Router.push('/cadastro')}
            >
              Cadastrar-se
            </Button>
            <Button
              type="button"
              bgColor="cores.laranja"
              color="cores.branco"
              size="md"
              _hover={{
                bg: 'cores.laranjaEscuro'
              }}
              _active={{
                bg: 'cores.laranjaEscuro2'
              }}
              _focus={{
                boxShadow: 'none'
              }}
              onClick={() => Router.push('/login')}
            >
              Logar
            </Button>
          </Flex>
        </Flex>
        {
          !isLoading && (
            <Flex flexDirection="column" alignItems="center" mb="2rem">
              <Text mb="2rem" color="cores.preto" fontSize="2rem" fontWeight="bold">Eventos disponíveis</Text>
              <Grid templateColumns="repeat(3, 1fr)" gap="2rem" mb="4rem">
                {
                  data?.eventos_ativos.map((evento) => {
                    return (
                      <HomeEvent key={evento.id} evento={evento} />
                    )
                  })
                }
              </Grid>

              <Text mb="2rem" color="cores.preto" fontSize="2rem" fontWeight="bold">Eventos finalizados</Text>
              <Grid templateColumns="repeat(3, 1fr)" gap="2rem">
                {
                  data?.eventos_passados.map((evento) => {
                    return (
                      <HomeEvent key={evento.id} evento={evento} />
                    )
                  })
                }
              </Grid>
            </Flex>
          )
        }
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});

/*
<Button
              type="submit"
              bgColor="cores.fundo"
              color="cores.laranja"
              border="2px"
              size="md"
              mr="1rem"
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
            >
              Cadastrar-se
            </Button>
*/

