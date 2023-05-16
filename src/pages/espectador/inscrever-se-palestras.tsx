import { Badge, Container, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import { DetalhesPalestraInscricao } from "../../components/EspectadorPalestra/DetalhesPalestraInscricao";
import Header from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { usePalestrasDisponiveis } from "../../services/hooks/usePalestrasDisponiveis";
import { withSSRAuth } from "../../utils/withSSRAuth";

export default function InscreverSePalestras() {
  const [page, setPage] = useState(1)
  const { data, isLoading, refetch } = usePalestrasDisponiveis({ page })

  return (
    <>
      <Header />
      <Flex flexDirection="column" p="0 1rem">
        <Container alignItems="center" shadow="md" border="2px" borderColor="cores.cinzaBorda" maxW="1480px" mt="2rem" bgColor="#FFF" mb="1rem" borderRadius="0.5rem" p="2rem">
          <Flex overflowX="auto" flexDirection="column" alignItems="center">
            <Text color="cores.cinzaEscuro" fontSize="1.5rem" mb="2rem" fontWeight="medium">Palestras para inscrever-se</Text>
            {
              !isLoading && !!data && data.palestras.length >= 1 && (
                <>
                  <Table overflowX="auto">
                    <Thead>
                      <Tr textAlign="center">
                      <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Palestrante</Th>
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Título da palestra</Th>
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Inicio</Th>
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Fim</Th>
                        <Th w="8"></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {
                        data?.palestras.map((palestra) => {
                          return (
                            <Tr key={palestra.id}>
                              <Td fontWeight="medium" color="cores.cinzaEscuro">{palestra.palestrante.nome}</Td>
                              <Td fontWeight="bold" color="cores.laranja">{palestra.nome}</Td>
                              <Td fontWeight="medium" color="cores.cinza">{format(parseISO(palestra.data_inicio), 'dd/MM/yyyy HH:mm')}</Td>
                              <Td fontWeight="medium" color="cores.cinza">{format(parseISO(palestra.data_fim), 'dd/MM/yyyy HH:mm')}</Td>
                              <Td>
                                <DetalhesPalestraInscricao refetch={refetch} palestra={palestra} />
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
  return {
    props: {}
  }
})
