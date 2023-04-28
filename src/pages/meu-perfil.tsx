import { Button, Flex, FormLabel, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Input } from "../components/Form/Input";
import Header from "../components/Header";
import UploadImage from "../components/UploadImage";
import { signOut } from "../contexts/authContext";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function MeuPerfil() {
  const [imagem, setImagem] = useState(null);
  const [idFoto, setIdFoto] = useState(null);

  return (
    <>
      <Header />
      <Flex justifyContent="center" m="2rem 0">
        <Flex
          as="form"
          width="100%"
          maxW="30rem"
          p="2rem"
          bg="cores.branco"
          borderRadius="0.5rem"
          alignItems="center"
          flexDir="column"
          border="2px"
          borderColor="cores.cinzaBorda"
          shadow="lg"
        >
          <Text color="cores.cinzaEscuro" fontSize="1.5rem" mb="2rem" fontWeight="medium">Editar perfil</Text>
          <Stack spacing="1rem" width="100%">
            <FormLabel>Foto de perfil</FormLabel>
            <Flex justifyContent="center">
              <UploadImage imagem={imagem} setImagem={setImagem} setIdFoto={setIdFoto} />
            </Flex>
            <Input
              name="usuário"
              label="Nome completo"
              defaultValue="Pedro Henrique Sanches Galvão"
            />
            <Input
              name="usuário"
              label="Email"
              type="email"
              defaultValue="admin@admin.com"
            />
            <Input
              name="senha"
              label="Senha atual"
              type="password"
              mb="1rem"
            />
            <Input
              name="senha"
              label="Nova senha"
              type="password"
              mb="1rem"
            />
            <Input
              name="senha"
              label="Confirmar nova senha"
              type="password"
              mb="1rem"
            />
            <Button
              type="submit"
              mt="1.75rem"
              colorScheme="green"
              size="lg"
              _focus={{
                boxShadow: 'none'
              }}
            >
              SALVAR
            </Button>
            <Button
              type="button"
              mt="1.75rem"
              colorScheme="red"
              size="lg"
              _focus={{
                boxShadow: 'none'
              }}
              onClick={signOut}
            >
              DESLOGAR
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})
