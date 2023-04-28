import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup';
import Router from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RiAddLine } from 'react-icons/ri'
import * as yup from 'yup';
import { api } from '../../services/apiClient';

import { Input } from '../Form/Input';
import SelectTipoUsuario from './SelectTipoUsuario';

type NovoUsuarioFormData = {
  nome?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const NovoUsuarioFormSchema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  email: yup.string().required('Email é obrigatório'),
  password: yup.string().required('Senha obrigatória'),
  confirmPassword: yup.string().when('password', (password, field) =>
        password ? field.required('Confirmação de senha obrigatória').oneOf([yup.ref('password')], 'Senhas não coincide') : field
      ),
})

type NovoUsuarioProps = {
  refetch: () => void
}

export function NovoUsuario({ refetch }: NovoUsuarioProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ tipo, setTipo ] = useState(0);

  const { register, handleSubmit, formState } = useForm<NovoUsuarioFormData>({
    resolver: yupResolver(NovoUsuarioFormSchema),
  })

  const { errors } = formState;
  const toast = useToast();

  const handleCadastrar: SubmitHandler<NovoUsuarioFormData> = async ({ nome, email, password, confirmPassword }) => {
    try {
      const response = await api.post('/admin', {
        nome,
        email,
        password,
        confirmPassword,
        nivel: tipo
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
        refetch();
        Router.reload();
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
    <>
      <Button
        type="button"
        colorScheme="green"
        color="cores.branco"
        size="md"
        _focus={{
          boxShadow: 'none'
        }}
        leftIcon={<Icon mb="0.1rem" as={RiAddLine} fontSize="25" />}
        onClick={onOpen}
      >
        Novo usuário
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside" size="4xl">
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(handleCadastrar)}>
          <ModalHeader color="cores.cinzaEscuro">Criar novo usuário</ModalHeader>
          <ModalBody>
            <VStack spacing="8" mb="1rem">
              <Grid w="100%" templateColumns="repeat(4, 1fr)" gap="4">
                <GridItem colSpan={2}>
                  <Input
                    name="nome"
                    label="Nome"
                    placeholder="Informe o nome do usuário"
                    {...register('nome')}
                    error={errors.nome}
                  />
                </GridItem>
                <GridItem colSpan={2}>
                  <Input
                    name="email"
                    label="Email"
                    placeholder="usuario@usuario.com"
                    type="email"
                    {...register('email')}
                    error={errors.email}
                  />
                </GridItem>
              </Grid>
              <Grid w="100%" gap="4" templateColumns="repeat(6, 1fr)">
                <GridItem colSpan={2}>
                  <Input
                    name="senha"
                    label="Senha"
                    placeholder="Informe a senha"
                    {...register('password')}
                    error={errors.password}
                    type="password"
                  />
                </GridItem>
                <GridItem colSpan={2}>
                  <Input
                    name="confirmPassword"
                    label="Confirmar senha"
                    placeholder="Confirme a senha"
                    {...register('confirmPassword')}
                    error={errors.confirmPassword}
                    type="password"
                  />
                </GridItem>
                <GridItem colSpan={2}>
                  <SelectTipoUsuario tipo={tipo} setTipo={setTipo} />
                </GridItem>
              </Grid>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button _focus={{ boxShadow: 'none' }} onClick={onClose} mr="1rem">Fechar</Button>
            <Button
              type="submit"
              colorScheme="green"
              color="cores.branco"
              size="md"
              _focus={{
                boxShadow: 'none'
              }}
              isLoading={formState.isSubmitting}
            >
              Cadastrar 
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}