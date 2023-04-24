import { Flex, Stack, Button, Image, useToast }  from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';

import { Input } from '../components/Form/Input';
import { AuthContext } from '../contexts/authContext';
import { withSSRGuest } from '../utils/withSSRGuest';
import Router from 'next/router';

type SignInFormData = {
  email?: string;
  password?: string;
}

const SignInFormSchema = yup.object().shape({
  email: yup.string().required('email obrigatório'),
  password: yup.string().required('Senha obrigatória')
})

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(SignInFormSchema),
  })

  const { signIn } = useContext(AuthContext);
  const { errors } = formState;
  const toast = useToast();

  const handleSignIn: SubmitHandler<SignInFormData> = async ({ email, password }) => {
    const data = {
      email: email || '',
      password: password || '',
    }

    try {
      await signIn(data);
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (err) {
      toast({
        title: "Erro ao logar-se.",
        description: "Email ou senha incorretos.",
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
        onSubmit={handleSubmit(handleSignIn)}
        shadow="lg"
      >
        <Image src="logo.svg" alt="logo" w="10rem" mb="2rem" />
        <Stack spacing="1rem" width="100%">
          <Input
            name="usuário"
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email}
          />
          <Input
            name="senha"
            label="Senha"
            type="password"
            mb="1rem"
            {...register('password')}
            error={errors.password}
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
            ENTRAR
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
            onClick={() => Router.push('/')}
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
