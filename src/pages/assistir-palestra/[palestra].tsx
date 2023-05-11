import Header from "../../components/Header";
import { withSSRAuth } from "../../utils/withSSRAuth";

import { useRouter } from 'next/router';
import { Container, Flex, Text } from "@chakra-ui/react";
import { useAssistirPalestra } from "../../services/hooks/useAssistirPalestra";

export default function AssistirPalestra() {
  const router = useRouter();
  const { palestra } = router.query

  const { data, isLoading } = useAssistirPalestra({id: Number(palestra)})
  
  return (
    <>
      <Header listaPalestras={false} />
      {
        !isLoading && !!data && (
          <Flex flexDirection="column" p="0 1rem">
            <Container alignItems="center" shadow="md" border="2px" borderColor="cores.cinzaBorda" maxW="1480px" mt="2rem" bgColor="#FFF" mb="1rem" borderRadius="0.5rem" p="2rem">
              <Flex mb="2rem" flexDirection="column">
                <Text fontWeight="bold" fontSize="2rem" color="cores.cinzaEscuro">{data.espectadorPalestra.palestra.nome}</Text>
                <Text fontWeight="medium" fontSize="1.5rem" color="cores.cinzaEscuro">Apresentado por {data.espectadorPalestra.palestra.palestrante.nome}</Text>
              </Flex>
              <iframe width="100%" height="750" src={`https://www.youtube.com/embed/${data.espectadorPalestra.palestra.link}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </Container>
          </Flex>
        )
      }
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})
