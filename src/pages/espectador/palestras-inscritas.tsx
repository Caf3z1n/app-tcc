import { Button, Container, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import { DetalhesPalestraInscrito } from "../../components/EspectadorPalestra/DetalhesPalestraInscrito";
import Header from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { api } from "../../services/apiClient";
import { usePalestrasInscritas } from "../../services/hooks/usePalestrasInscritas";
import { withSSRAuth } from "../../utils/withSSRAuth";

export default function InscreverSePalestras() {
  const [page, setPage] = useState(1)
  const { data, isLoading } = usePalestrasInscritas({ page })

  const toast = useToast();

  async function handleCertificado(id: number) {
    try {
      const response = await api.post(`/certificado/${id}`);

      await new Promise(resolve => setTimeout(resolve, 500));

      window.open(response.data.certificado.url, '_blank')
    }catch (err) {
      return toast({
        title: "Houve um erro ao gerar certificado",
        description: "Tente novamente mais tarde",
        status: "error",
        duration: 2000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Header />
      <Flex flexDirection="column" p="0 1rem">
        <Container alignItems="center" shadow="md" border="2px" borderColor="cores.cinzaBorda" maxW="1480px" mt="2rem" bgColor="#FFF" mb="1rem" borderRadius="0.5rem" p="2rem">
          <Flex overflowX="auto" flexDirection="column" alignItems="center">
            <Text color="cores.cinzaEscuro" fontSize="1.5rem" mb="2rem" fontWeight="medium">Minhas palestras inscritas</Text>
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
                        <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal" textAlign="center">Presença</Th>
                        <Th w="8"></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {
                        data?.palestras.map((palestra) => {
                          return (
                            <Tr key={palestra.id}>
                              <Td fontWeight="bold" color="cores.cinzaEscuro">{palestra.palestrante.nome}</Td>
                              <Td fontWeight="bold" color="cores.laranja">{palestra.nome}</Td>
                              <Td fontWeight="medium" color="cores.cinza">{format(parseISO(palestra.data_inicio), 'dd/MM/yyyy HH:mm')}</Td>
                              <Td fontWeight="medium" color="cores.cinza">{format(parseISO(palestra.data_fim), 'dd/MM/yyyy HH:mm')}</Td>
                              {
                                palestra.porcentagem < 75 ? (
                                  <Td textAlign="center" fontWeight="bold" color="cores.cinzaEscuro">
                                    {palestra.porcentagem}%
                                  </Td>   
                                ) : (
                                  <Td textAlign="center">
                                    <Button
                                      type="button"
                                      colorScheme="green"
                                      color="cores.branco"
                                      size="sm"
                                      _focus={{
                                        boxShadow: 'none'
                                      }}
                                      onClick={() => handleCertificado(palestra.id_espectador_palestra)}
                                    >
                                      CERTIFICADO
                                    </Button>
                                  </Td> 
                                )
                              }
                              <Td>
                                <DetalhesPalestraInscrito palestra={palestra} />
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
