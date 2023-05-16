/* eslint-disable react-hooks/rules-of-hooks */
import { Flex, Text, Container, Button, Table, Thead, Tr, Th, Tbody, Td, Image, useToast } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns';

import { withSSRAuth } from "../../utils/withSSRAuth";
import Header from "../../components/Header";
import { useSolicitacaoPalestrantes } from '../../services/hooks/useSolicitacaoPalestrantes';
import { api } from '../../services/apiClient';
import { Pagination } from '../../components/Pagination';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { parseCookies } from 'nookies';
import decode from 'jwt-decode';

export default function AprovarPalestrante() {
  const toast = useToast();
  const { nivel } = useContext(AuthContext);

  const [page, setPage] = useState(1)
  const { data, isLoading, refetch } = useSolicitacaoPalestrantes({ page })

  async function handleAceitarRecusar(id_palestrante, criar) {
    try {
      await api.put(`/solicitar-palestrante/${id_palestrante}`, {
        criar
      })

      toast({
        title: "Palestrante aprovado/reprovado com sucesso",
        description: "Se aprovado ele já pode se logar agora",
        status: "success",
        duration: 2000,
        isClosable: true,
      })
    }catch (err) {
      toast({
        title: "Erro ao aprovar/reprovar palestrante",
        description: "Tente novamente mais tarde",
        status: "error",
        duration: 2000,
        isClosable: true,
      })
    }
    refetch()
  }
  
  return (
    <>
      <Header />
      <Flex flexDirection="column" p="0 1rem">
        <Container alignItems="center" shadow="md" border="2px" borderColor="cores.cinzaBorda" maxW="1480px" mt="2rem" bgColor="#FFF" mb="1rem" borderRadius="0.5rem" p="2rem">
          <Flex flexDirection="column" alignItems="center">
            <Text color="cores.cinzaEscuro" fontSize="1.5rem" mb="2rem" fontWeight="medium">Aprovar solicitações de palestrantes</Text>
            {
              !isLoading && !!data && data.palestrantes.length >= 1 && (
                <>
                  <Table>
                    <Thead>
                      <Tr textAlign="center">
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Foto</Th>
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Nome</Th>
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Email</Th>
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Solicitado em</Th>
                        <Th w="8"></Th>
                        <Th w="8"></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {
                        data?.palestrantes.map((palestrante) => {
                          return (
                            <Tr key={palestrante.id}>
                              <Td fontWeight="medium" color="cores.cinzaEscuro">
                                <Image objectFit="cover" border="2px" borderColor="cores.cinzaBorda" borderRadius="50%" alt="teste" src={palestrante.foto.url} w="3rem" h="3rem" />
                              </Td>
                              <Td fontWeight="bold" color="cores.cinzaEscuro">{palestrante.nome}</Td>
                              <Td fontWeight="medium" color="cores.laranja">{palestrante.email}</Td>
                              <Td fontWeight="medium" color="cores.cinza">{format(parseISO(palestrante.createdAt), 'dd/MM/yyyy')}</Td>
                              <Td textAlign="right">
                                <Button
                                  type="button"
                                  colorScheme="green"
                                  color="cores.branco"
                                  size="md"
                                  _focus={{
                                    boxShadow: 'none'
                                  }}
                                  onClick={() => handleAceitarRecusar(palestrante.id, true)}
                                >
                                  Aprovar
                                </Button>
                              </Td>
                              <Td textAlign="right">
                                <Button
                                  type="button"
                                  colorScheme="red"
                                  color="cores.branco"
                                  size="md"
                                  _focus={{
                                    boxShadow: 'none'
                                  }}
                                  onClick={() => handleAceitarRecusar(palestrante.id, false)}
                                >
                                  Recusar
                                </Button>
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
