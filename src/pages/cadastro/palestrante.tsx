import { Flex, Stack, Button, Image, useToast, FormLabel, Icon, Box } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Router from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Input } from '../../components/Form/Input';
import { api } from '../../services/apiClient';
import { withSSRGuest } from '../../utils/withSSRGuest';
import UploadImage from '../../components/UploadImage';
import { useState } from 'react';

type SignInFormData = {
  nome?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const SignInFormSchema = yup.object().shape({
  nome: yup.string().required('nome completo é obrigatório'),
  email: yup.string().required('email obrigatório'),
  password: yup.string().required('Senha obrigatória'),
  confirmPassword: yup.string().when('password', (password, field) =>
        password ? field.required('Confirmação de senha obrigatória').oneOf([yup.ref('password')], 'Senhas não coincide') : field
      ),
})

export default function CadastroPalestrante() {
  const [imagem, setImagem] = useState(null);
  const [idFoto, setIdFoto] = useState(null);

  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(SignInFormSchema),
  })

  const { errors } = formState;
  const toast = useToast();

  const handleCadastrar: SubmitHandler<SignInFormData> = async ({ nome, email, password, confirmPassword }) => {
    if(idFoto === null) {
      return toast({
        title: "Necessário carregar uma foto",
        description: "Para poder se registar como palestrante é obrigatório uma foto!",
        status: "error",
        duration: 2000,
        isClosable: true,
      })
    }

    try {
      const response = await api.post('/solicitar-palestrante', {
        nome,
        email,
        password,
        confirmPassword,
        id_foto: idFoto
      })

      if(response.data.error === 'Email já cadastrado') {
        toast({
          title: "Erro ao cadastrar-se.",
          description: "Email já cadastrado!",
          status: "error",
          duration: 2000,
          isClosable: true,
        })
      }else {
        toast({
          title: "Solicitação de cadastrado de palestrante enviada",
          description: "Agora é só aguardar um administrador aprovar o seu cadastro :)",
          status: "success",
          duration: 3500,
          isClosable: true,
        })

        Router.push('/')
      }
    } catch (err) {
      toast({
        title: "Erro ao cadastrar-se.",
        description: "Houve uma falha ao se comunicar com o servidor",
        status: "error",
        duration: 2000,
        isClosable: true,
      })
    }
  }

  return (
    <Flex
      h="100%"
      align="center"
      justify="center"
      flexDirection="column"
      p="4rem 0"
    >
      <Flex
        as="form"
        width="100%"
        maxW="25rem"
        p="2rem"
        bg="cores.branco"
        borderRadius="0.5rem"
        alignItems="center"
        flexDir="column"
        border="2px"
        borderColor="cores.cinzaBorda"
        onSubmit={handleSubmit(handleCadastrar)}
        shadow="lg"
      >
        <Image src="../logo.svg" alt="logo" w="10rem" mb="2rem" />
        <Stack spacing="1rem" width="100%">
          <Input
            name="nome"
            label="Nome completo"
            {...register('nome')}
            error={errors.nome}
          />
          <Input
            name="email"
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email}
          />
          <Input
            name="senha"
            label="Senha"
            type="password"
            {...register('password')}
            error={errors.password}
          />
          <Input
            name="confirmar_senha"
            label="Confirmar senha"
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword}
          />
          <FormLabel>Foto de perfil</FormLabel>
          <Flex justifyContent="center">
            <UploadImage imagem={imagem} setImagem={setImagem} setIdFoto={setIdFoto} />
          </Flex>
        </Stack>
        <Button
            w="100%"
            type="submit"
            mt="2.5rem"
            bgColor="cores.laranja"
            color="cores.branco"
            size="lg"
            _hover={{
              bg: 'cores.laranjaEscuro'
            }}
            _active={{
              bg: 'cores.laranjaEscuro2'
            }}
            _focus={{
              boxShadow: 'none'
            }}
            isLoading={formState.isSubmitting}  
          >
            CADASTRAR
          </Button>
          <Button
            w="100%"
            type="button"
            mt="1rem"
            bgColor="cores.branco"
            color="cores.laranja"
            border="2px"
            size="lg"
            _hover={{
              bgColor: "rgba(0, 0, 0, 0.04)",
              color: 'cores.laranjaEscuro'
            }}
            _active={{
              bgColor: "rgba(0, 0, 0, 0.06)",
              color: 'cores.laranjaEscuro2'
            }}
            _focus={{
              boxShadow: 'none'
            }}
            onClick={() => Router.push('/cadastro')}
          >
            VOLTAR
          </Button>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});
