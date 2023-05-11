/* eslint-disable react-hooks/rules-of-hooks */
import { Flex, Text, Container, Table, Thead, Tr, Th, Tbody, Td, Badge, Image } from '@chakra-ui/react'

import { withSSRAuth } from "../../utils/withSSRAuth";
import Header from "../../components/Header";
import { parseISO, format } from 'date-fns';
import { Pagination } from '../../components/Pagination';
import { useState } from 'react';
import { parseCookies } from 'nookies';
import decode from 'jwt-decode';
import { useUsuarios } from '../../services/hooks/useUsers';
import { NovoUsuario } from '../../components/NovoUsuario';

export default function Usuarios() {
  const [page, setPage] = useState(1)
  const { data, isLoading, refetch } = useUsuarios({ page })
  
  return (
    <>
      <Header />
      <Flex flexDirection="column" p="0 1rem">
        <Container alignItems="center" shadow="md" border="2px" borderColor="cores.cinzaBorda" maxW="1480px" mt="2rem" bgColor="#FFF" mb="1rem" borderRadius="0.5rem" p="2rem">
          <Flex overflowX="auto" flexDirection="column" alignItems="center">
            <Text color="cores.cinzaEscuro" fontSize="1.5rem" mb="2rem" fontWeight="medium">Todos os usuários</Text>
            {
              !isLoading && !!data && data.usuarios.length >= 1 && (
                <>
                  <Flex w="100%" justifyContent="right" mb="2rem">
                    <NovoUsuario refetch={refetch} />
                  </Flex>
                  <Table overflowX="auto">
                    <Thead>
                      <Tr textAlign="center">
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Foto</Th>
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Nome</Th>
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Email</Th>
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Nível</Th>
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Data inscrição</Th>
                        <Th w="8"></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {
                        data?.usuarios.map((usuario) => {
                          return (
                            <Tr key={usuario.id}>
                              <Td fontWeight="bold" color="cores.laranja">{usuario.foto !== null ?
                                (
                                  <Image objectFit="cover" border="2px" borderColor="cores.cinzaBorda" borderRadius="50%" alt="teste" src={usuario.foto.url} w="3rem" h="3rem" />
                                ) : 
                                (
                                  <Image objectFit="cover" border="2px" borderColor="cores.cinzaBorda" borderRadius="50%" alt="teste" src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" w="3rem" h="3rem" />
                                )
                              }</Td>
                              <Td fontWeight="bold" color="cores.cinzaEscuro">{usuario.nome}</Td>
                              <Td fontWeight="medium" color="cores.laranja">{usuario.email}</Td>
                              <Td fontWeight="medium" color="cores.cinza">{usuario.nivel === 0 ? 'Administrador' : usuario.nivel === 1 ? 'Palestrante' : 'Espectador'}</Td>
                              <Td fontWeight="medium" color="cores.cinza">{format(parseISO(usuario.createdAt), 'dd/MM/yyyy')}</Td>
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
