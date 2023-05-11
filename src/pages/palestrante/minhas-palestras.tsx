/* eslint-disable react-hooks/rules-of-hooks */
import { Flex, Text, Container, Table, Thead, Tr, Th, Tbody, Td, Stack, Button, Icon, Image, Badge } from '@chakra-ui/react'

import { withSSRAuth } from "../../utils/withSSRAuth";
import Header from "../../components/Header";
import { parseISO, format } from 'date-fns';
import { Pagination } from '../../components/Pagination';
import { useState } from 'react';
import { DetalhesPalestra } from '../../components/PalestrantePalestra';
import { useMinhasPalestras } from '../../services/hooks/useMinhasPalestras';
import { parseCookies } from 'nookies';
import decode from 'jwt-decode'
import { NovaPalestra } from '../../components/PalestrantePalestra/NovaPalestra';

export default function MinhasPalestras() {
  const [page, setPage] = useState(1)
  const { data, isLoading, refetch } = useMinhasPalestras({ page })
  
  return (
    <>
      <Header />
      <Flex flexDirection="column" p="0 1rem">
        <Container alignItems="center" shadow="md" border="2px" borderColor="cores.cinzaBorda" maxW="1480px" mt="2rem" bgColor="#FFF" mb="1rem" borderRadius="0.5rem" p="2rem">
          <Flex overflowX="auto" flexDirection="column" alignItems="center">
            <Text color="cores.cinzaEscuro" fontSize="1.5rem" mb="2rem" fontWeight="medium">Minhas palestras</Text>
            {
              !isLoading && !!data && data.palestras.length >= 1 && (
                <>
                  <Flex w="100%" justifyContent="right" mb="2rem">
                    <NovaPalestra refetch={refetch} />
                  </Flex>
                  <Table overflowX="auto">
                    <Thead>
                      <Tr textAlign="center">
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Título da palestra</Th>
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Tipo</Th>
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Inicio</Th>
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Fim</Th>
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Status</Th>
                        <Th w="8"></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {
                        data?.palestras.map((palestra) => {
                          return (
                            <Tr key={palestra.id}>
                              <Td fontWeight="bold" color="cores.laranja">{palestra.nome}</Td>
                              <Td fontWeight="medium" color="cores.cinza">{palestra.tipo === 0 ? 'Presencial' : palestra.tipo === 1 ? 'Presencial e Virtual': 'Virtual'}</Td>
                              <Td fontWeight="medium" color="cores.cinza">{format(parseISO(palestra.data_inicio), 'dd/MM/yyyy HH:mm')}</Td>
                              <Td fontWeight="medium" color="cores.cinza">{format(parseISO(palestra.data_fim), 'dd/MM/yyyy HH:mm')}</Td>
                              <Td>
                                {
                                  palestra.status === 'Ativo' ? (
                                    <Badge colorScheme="green" variant="outline">{palestra.status}</Badge>) :
                                  palestra.status === 'Aguardando aprovação' ? (
                                    <Badge colorScheme="yellow" variant="outline">{palestra.status}</Badge>) :
                                  (<Badge colorScheme="red" variant="outline">{palestra.status}</Badge>)
                                }
                                </Td>
                              <Td>
                                <DetalhesPalestra refetch={refetch} palestra={palestra} />
                              </Td>
                            </Tr>
                          )
                        })
                      }
                    </Tbody>
                  </Table>
                  <Pagination
                    currentPage={page}
                    totalCountOfRegisters={data.paginacao.quantidadeTotalDeItens}
                    onPageChange={setPage}
                    registersPerPage={10}
                  />
                </>
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

  if (token.nivel === 0 ) {
    return {
      redirect: {
        destination: '/admin/aprovar-palestrante',
        permanent: false,
      }
    }
  }else if (token.nivel === 2) {
    return {
      redirect: {
        destination: '/espectador/inscrever-se-palestras',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
})
