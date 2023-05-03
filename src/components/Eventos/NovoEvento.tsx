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
import { addHours } from 'date-fns'

import { Input } from '../Form/Input';
import Periodo from '../Periodo';

type NovoEventoFormData = {
  nome?: string;
  local?: string;
  descricao?: string;
}

const NovoEventoFormDataFormSchema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  local: yup.string().required('Local obrigatório'),
  descricao: yup.string().required('Descriçao obrigatória'),
})

type NovoEventoProps = {
  refetch: () => void
}

export function NovoEvento({ refetch }: NovoEventoProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const { register, handleSubmit, formState } = useForm<NovoEventoFormData>({
    resolver: yupResolver(NovoEventoFormDataFormSchema),
  })

  const { errors } = formState;
  const toast = useToast();

  const handleCadastrar: SubmitHandler<NovoEventoFormData> = async ({ nome, local, descricao }) => {
    if (!selectedDates[1]) {
      toast({
        title: "Erro ao cadastrar novo evento",
        description: "Informe o período do evento",
        status: "error",
        duration: 2000,
        isClosable: true,
      })
    }else {
      try {
        await api.post('/eventos', {
          nome,
          descricao,
          local,
          data_inicio: addHours(selectedDates[0], 6),
          data_fim: selectedDates[1]
        })
        console.log(selectedDates)
  
        toast({
          title: "Evento cadastrado com sucesso",
          description: "Agora é só atribuir as palestras",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
  
        onClose();
        //refetch();
        //Router.reload();
      } catch (err) {
        toast({
          title: "Erro ao cadastrar o evento",
          description: "Houve uma falha ao se comunicar com o servidor",
          status: "error",
          duration: 2000,
          isClosable: true,
        })
      }
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
        Novo evento
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside" size="4xl">
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(handleCadastrar)}>
          <ModalHeader color="cores.cinzaEscuro">Cadastrar novo evento</ModalHeader>
          <ModalBody>
            <VStack spacing="8" mb="1rem">
              <Grid w="100%" templateColumns="repeat(4, 1fr)" gap="4">
                <GridItem colSpan={2}>
                  <Input
                    name="nome"
                    label="Nome"
                    placeholder="Informe o nome do evento"
                    {...register('nome')}
                    error={errors.nome}
                  />
                </GridItem>
                <GridItem colSpan={2}>
                  <Input
                    name="local"
                    label="Local"
                    textTransform="capitalize"
                    placeholder="Av. Paulista, 1000 - Bela Vista, São Paulo"
                    {...register('local')}
                    error={errors.local}
                  />
                </GridItem>
              </Grid>
              <Grid w="100%" gap="4" templateColumns="repeat(6, 1fr)">
                <GridItem colSpan={4}>
                  <Input
                    name="descricao"
                    label="Descrição"
                    placeholder="Uma breve descrição do evento"
                    {...register('descricao')}
                    error={errors.descricao}
                  />
                </GridItem>
                <GridItem colSpan={2}>
                  <Periodo selectedDates={selectedDates} setSelectedDates={setSelectedDates} />
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