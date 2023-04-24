import { Flex, Stack, Button, Image, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Router from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Input } from '../../components/Form/Input';
import { api } from '../../services/apiClient';
import { withSSRGuest } from '../../utils/withSSRGuest';

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

export default function CadastroEspectador() {
  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(SignInFormSchema),
  })

  const { errors } = formState;
  const toast = useToast();

  const handleCadastrar: SubmitHandler<SignInFormData> = async ({ nome, email, password, confirmPassword }) => {
    try {
      const response = await api.post('/espectador', {
        nome,
        email,
        password,
        confirmPassword
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
          title: "Usuário cadastrado com sucesso",
          description: "Agora é só se logar :)",
          status: "success",
          duration: 3000,
          isClosable: true,
        })

        Router.push('/')
      }
      //await new Promise(resolve => setTimeout(resolve, 1500));
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
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
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
            mb="1rem"
            {...register('confirmPassword')}
            error={errors.confirmPassword}
          />
          <Button
            type="submit"
            mt="1.75rem"
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
            type="button"
            mt="1.75rem"
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
        </Stack>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});
