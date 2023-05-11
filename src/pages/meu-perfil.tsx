import { Button, Flex, FormLabel, Stack, Text, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { Input } from "../components/Form/Input";
import Header from "../components/Header";
import UploadImage from "../components/UploadImage";
import { AuthContext, signOut } from "../contexts/authContext";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";

type MeuPerfilFormData = {
  nome?: string;
  email?: string;
  oldPassword?: string;
  password?: string;
  confirmPassword?: string;
}

const MeuPerfilFormSchema = yup.object().shape({
  nome: yup.string(),
  email: yup.string(),
  oldPassword: yup.string(),
  password: yup.string(),
  confirmPassword: yup.string().when('password', (password, field) =>
    password ? field.oneOf([yup.ref('password')], 'Senhas não coincide') : field
  ),
})


export default function MeuPerfil() {
  const { nome, email, user } = useContext(AuthContext);

  const [imagem, setImagem] = useState(user?.foto || null);
  const [idFoto, setIdFoto] = useState(user?.foto?.id || null);

  useEffect (() => {
    setImagem(user?.foto)
    setIdFoto(user?.foto?.id)
  }, [user])

  const { register, handleSubmit, formState } = useForm<MeuPerfilFormData>({
    resolver: yupResolver(MeuPerfilFormSchema),
  })

  const { errors } = formState;
  const toast = useToast();

  const handleMeuPerfil: SubmitHandler<MeuPerfilFormData> = async ({ nome, email, oldPassword, password, confirmPassword }) => {
    let data = {}
    
    if (nome !== '' && nome !== null) {
      data = {
        ...data,
        nome
      }
    }

    if (email !== '' && email !== null) {
      data = {
        ...data,
        email
      }
    }

    if (idFoto && idFoto !== null) {
      data = {
        ...data,
        id_foto: idFoto
      }
    }

    if (oldPassword !== '' && oldPassword !== null) {
      data = {
        ...data,
        oldPassword
      }
    }

    if (password !== '' && password !== null) {
      data = {
        ...data,
        password
      }
    }

    if (confirmPassword !== '' && confirmPassword !== null) {
      data = {
        ...data,
        confirmPassword
      }
    }

    try {
      const response = await api.put('/me',
        data
      )
  
      if(response.data.error) {
        toast({
          title: "Erro ao atualizar perfil",
          description: response.data.error,
          status: "error",
          duration: 2000,
          isClosable: true,
        })
      }else {
        toast({
          title: "Perfil atualizado com sucesso",
          description: "Suas informações foram atualizadas :)",
          status: "success",
          duration: 2000,
          isClosable: true,
        })
      }
    }catch (err) {
      toast({
        title: "Erro ao atualizar perfil",
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
          onSubmit={handleSubmit(handleMeuPerfil)}
        >
          <Text color="cores.cinzaEscuro" fontSize="1.5rem" mb="2rem" fontWeight="medium">Editar perfil</Text>
          <Stack spacing="1rem" width="100%">
            <FormLabel>Foto de perfil</FormLabel>
            <Flex justifyContent="center">
              <UploadImage imagem={imagem} setImagem={setImagem} setIdFoto={setIdFoto} />
            </Flex>
            <Input
              name="nome"
              label="Nome completo"
              defaultValue={nome}
              {...register('nome')}
              error={errors.nome}
            />
            <Input
              name="email"
              label="Email"
              type="email"
              defaultValue={email}
              {...register('email')}
              error={errors.email}
              autoFocus
            />
            <Input
              name="oldPassword"
              label="Senha atual"
              type="password"
              {...register('oldPassword')}
              error={errors.oldPassword}
            />
            <Input
              name="password"
              label="Nova senha"
              type="password"
              {...register('password')}
              error={errors.password}
            />
            <Input
              name="confirmPassword"
              label="Confirmar nova senha"
              type="password"
              {...register('confirmPassword')}
              error={errors.confirmPassword}
              mb="2rem"
            />
            <Button
              type="submit"
              colorScheme="green"
              size="lg"
              _focus={{
                boxShadow: 'none'
              }}
              isLoading={formState.isSubmitting}
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
