/* eslint-disable react-hooks/rules-of-hooks */
import { Flex, Text, Container, Button, Table, Thead, Tr, Th, Tbody, Td, Image } from '@chakra-ui/react'

import { withSSRAuth } from "../../utils/withSSRAuth";
import Header from "../../components/Header";
import { useSolicitacaoPalestras } from '../../services/hooks/useSolicitacaoPalestras';
import { AprovarReprovarPalestra } from '../../components/AprovarReprovarPalestra';
import { parseCookies } from 'nookies';
import decode from 'jwt-decode';

export default function AprovarPalestras() {
  const { data, isLoading, refetch } = useSolicitacaoPalestras()
  
  return (
    <>
      <Header />
      <Flex flexDirection="column" p="0 1rem">
        <Container alignItems="center" shadow="md" border="2px" borderColor="cores.cinzaBorda" maxW="1480px" mt="2rem" bgColor="#FFF" mb="1rem" borderRadius="0.5rem" p="2rem">
          <Flex overflowX="auto" flexDirection="column" alignItems="center">
            <Text color="cores.cinzaEscuro" fontSize="1.5rem" mb="2rem" fontWeight="medium">Aprovar solicitações de palestras</Text>
            {
              !isLoading && !!data && data.palestras.length >= 1 && (
                  <Table overflowX="auto">
                    <Thead>
                      <Tr textAlign="center">
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Foto</Th>
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Nome palestrante</Th>
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Título da palestra</Th>
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Tipo</Th>
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Evento</Th>
                        <Th w="8"></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {
                        data?.palestras.map((palestra) => {
                          return (
                            <Tr key={palestra.id}>
                              <Td fontWeight="medium" color="cores.cinzaEscuro">
                                <Image objectFit="cover" border="2px" borderColor="cores.cinzaBorda" borderRadius="50%" alt="teste" src={palestra.palestrante.foto.url} w="3rem" h="3rem" />
                              </Td>
                              <Td fontWeight="bold" color="cores.cinzaEscuro">{palestra.palestrante.nome}</Td>
                              <Td fontWeight="medium" color="cores.laranja">{palestra.nome}</Td>
                              <Td fontWeight="medium" color="cores.cinza">{palestra.tipo === 0 ? 'Presencial' : palestra.tipo === 1 ? 'Presencial e Virtual': 'Virtual'}</Td>
                              <Td fontWeight="medium" color="cores.cinza">{palestra.evento.nome}</Td>
                              <Td textAlign="right">
                                <AprovarReprovarPalestra refetch={refetch} palestra={palestra} />
                              </Td>
                            </Tr>
                          )
                        })
                      }
                    </Tbody>
                  </Table>
              )
            }
          </Flex>
        </Container>
      </Flex>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const cookies = parseCookies(ctx);
  const token: { nivel: number } = decode(cookies['webnar-athon.token']);

  if (token.nivel === 1) {
    return {
      redirect: {
        destination: '/palestrante/minhas-palestras',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
})
