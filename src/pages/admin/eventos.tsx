/* eslint-disable react-hooks/rules-of-hooks */
import { Flex, Text, Container, Table, Thead, Tr, Th, Tbody, Td, Stack, Button, Icon } from '@chakra-ui/react'

import { withSSRAuth } from "../../utils/withSSRAuth";
import Header from "../../components/Header";
import { useTodosEventos } from '../../services/hooks/useTodosEventos';
import { parseISO, format } from 'date-fns';
import { Pagination } from '../../components/Pagination';
import { useState } from 'react';
import { DetalhesEvento } from '../../components/Eventos/DetalhesEvento';
import { NovoEvento } from '../../components/Eventos/NovoEvento';
import { parseCookies } from 'nookies';
import decode from 'jwt-decode';

export default function Eventos() {
  const [page, setPage] = useState(1)
  const { data, isLoading, refetch } = useTodosEventos({ page })
  
  return (
    <>
      <Header />
      <Flex flexDirection="column" p="0 1rem">
        <Container alignItems="center" shadow="md" border="2px" borderColor="cores.cinzaBorda" maxW="1480px" mt="2rem" bgColor="#FFF" mb="1rem" borderRadius="0.5rem" p="2rem">
          <Flex overflowX="auto" flexDirection="column" alignItems="center">
            <Text color="cores.cinzaEscuro" fontSize="1.5rem" mb="2rem" fontWeight="medium">Todos os eventos</Text>
            <Flex w="100%" justifyContent="right" mb="2rem">
              <NovoEvento refetch={refetch} />
            </Flex>
            {
              !isLoading && !!data && data.eventos.length >= 1 && (
                <>
                  <Table overflowX="auto">
                    <Thead>
                      <Tr textAlign="center">
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Nome</Th>
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Descrição</Th>
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Palestras</Th>
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Data Inicio</Th>
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Data Fim</Th>
                        <Th w="8"></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {
                        data?.eventos.map((evento) => {
                          return (
                            <Tr key={evento.id}>
                              <Td fontWeight="bold" color="cores.cinzaEscuro">{evento.nome}</Td>
                              <Td fontWeight="medium" color="cores.cinza" fontSize="0.9rem">{evento.descricao}</Td>
                              <Td fontWeight="bold" color="cores.laranja" fontSize="1.1rem" textAlign="center">{evento.palestras.length}</Td>
                              <Td fontWeight="medium" color="cores.cinza">{format(parseISO(evento.data_inicio), 'dd/MM/yyyy')}</Td>
                              <Td fontWeight="medium" color="cores.cinza">{format(parseISO(evento.data_fim), 'dd/MM/yyyy')}</Td>
                              <Td textAlign="right">
                                <DetalhesEvento evento={evento} />
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

  if (token.nivel === 1 ) {
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
