import { Flex, Stack, Button, Image, useToast }  from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../components/Form/Input';
import { withSSRGuest } from '../utils/withSSRGuest';
import Router from 'next/router';
import { api } from '../services/apiClient';

type SignInFormData = {
  email?: string;
}

const SignInFormSchema = yup.object().shape({
  email: yup.string().required('email obrigatório'),
})

export default function EsqueciSenha() {
  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(SignInFormSchema),
  })

  const { errors } = formState;
  const toast = useToast();

  const handleNovaSenha: SubmitHandler<SignInFormData> = async ({ email }) => {
    try {
      const response = await api.post('/email', {
        email,
      })

      if (response.data.erro) {
        toast({
          title: "Erro ao gerar nova senha",
          description: response.data.erro,
          status: "error",
          duration: 2000,
        isClosable: true,
        })
      }else {
        toast({
          title: "Nova senha enviada",
          description: "Uma nova senha aleatória foi enviada ao email cadastrado",
          status: "success",
          duration: 5000,
          isClosable: false,
        })
      }
    } catch (err) {
      toast({
        title: "Erro ao gerar nova senha",
        description: "Tente novamente mais tarde",
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
        onSubmit={handleSubmit(handleNovaSenha)}
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
            GERAR NOVA SENHA
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
            onClick={() => Router.push('/login')}
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
