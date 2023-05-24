import Header from "../../../components/Header";
import { withSSRAuth } from "../../../utils/withSSRAuth";

import { useRouter } from 'next/router';
import { Button, Container, Flex, Image, Table, Tbody, Td, Text, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import { parseCookies } from "nookies";
import decode from 'jwt-decode'
import { useLiberarCertificado } from "../../../services/hooks/useLiberarCertificado";
import { api } from "../../../services/apiClient";

export default function AssistirPalestra() {
  const router = useRouter();
  const { palestra } = router.query
  const toast = useToast();

  const { data, isLoading, refetch } = useLiberarCertificado({id: Number(palestra)})

  async function handleLiberarCertificado(id: number) {
    try {
      await api.post(`/aprovar-certificados/${id}`)

      toast({
        title: "Certificado liberado com sucesso",
        description: "Espectador teve sua presença confirmada com 100%",
        status: "success",
        duration: 2000,
        isClosable: true,
      })
    }catch (err) {
      toast({
        title: "Erro ao liberar certificado",
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
          <Flex overflowX="auto" flexDirection="column" alignItems="center">
            {
              !isLoading && !!data && (
                <Text w="40rem" textAlign="center" color="cores.cinzaEscuro" fontSize="1.5rem" mb="2rem" fontWeight="medium">Liberar certificados da palestra: {data.palestra.nome}</Text>
              )
            }
            {
              !isLoading && !!data && data.espectadores.length >= 1 && (
                <Table overflowX="auto">
                  <Thead>
                    <Tr textAlign="center">
                      <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Foto</Th>
                      <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Nome</Th>
                      <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal">Email</Th>
                      <Th fontSize="1.1rem" color="cores.cinza" fontWeight="normal" textAlign="center">Presença</Th>
                      <Th w="8"></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {
                      data?.espectadores.map((espectador) => {
                        return (
                          <Tr key={espectador.espectador.id}>
                            <Td fontWeight="bold" color="cores.laranja">{espectador.espectador.foto !== null ?
                                (
                                  <Image objectFit="cover" border="2px" borderColor="cores.cinzaBorda" borderRadius="50%" alt="teste" src={espectador.espectador.foto.url} w="3rem" h="3rem" />
                                ) : 
                                (
                                  <Image objectFit="cover" border="2px" borderColor="cores.cinzaBorda" borderRadius="50%" alt="teste" src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" w="3rem" h="3rem" />
                                )
                            }</Td>
                            <Td fontWeight="medium" color="cores.cinzaEscuro">{espectador.espectador.nome}</Td>
                            <Td fontWeight="medium" color="cores.laranja">{espectador.espectador.email}</Td>
                            <Td fontWeight="bold" color="cores.cinzaEscuro" textAlign="center">{Number(espectador.tempo_assistido * 100 / data.duracao_palestra).toFixed(0)}%</Td>
                            <Td>
                              <Button
                                type="button"
                                colorScheme="green"
                                color="cores.branco"
                                size="md"
                                _focus={{
                                  boxShadow: 'none'
                                }}
                                onClick={() => handleLiberarCertificado(espectador.id)}
                              >
                                Liberar
                              </Button>
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
