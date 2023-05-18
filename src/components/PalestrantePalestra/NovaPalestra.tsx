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
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RiAddLine } from 'react-icons/ri'
import * as yup from 'yup';
import { api } from '../../services/apiClient';
import { useHomeEventos } from '../../services/hooks/useHomeEventos';
import { parseISO } from 'date-fns'

import { Input } from '../Form/Input';
import SelectEvento from './SelectEvento';
import SelectTipo from './SelectTipo';

type NovaPalestraFormData = {
  nome?: string;
  local?: string;
  descricao?: string;
  data_inicio?: string;
  data_fim?: string;
  link?: string;
}

const NovaPalestraFormDataFormSchema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  descricao: yup.string().required('Descriçao obrigatória'),
  local: yup.string(),
  data_inicio: yup.string().required('Data de inicio é obrigatória'),
  data_fim: yup.string().required('Data do fim é obrigatória'),
  link: yup.string(),
})

type NovaPalestraProps = {
  refetch: () => void
}

export function NovaPalestra({ refetch }: NovaPalestraProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ evento, setEvento ] = useState(0);
  const [ tipo, setTipo ] = useState(0);
  const [link, setLink] = useState('')

  const { data: eventos } = useHomeEventos();

  const { register, handleSubmit, formState } = useForm<NovaPalestraFormData>({
    resolver: yupResolver(NovaPalestraFormDataFormSchema),
  })

  const { errors } = formState;
  const toast = useToast();

  useEffect(() => {
    if(tipo === 0) {
      setLink('')
    }
  }, [tipo])

  const handleCadastrar: SubmitHandler<NovaPalestraFormData> = async ({ nome, local, descricao, data_inicio, data_fim, link }) => {
    try {
      await api.post('/solicitar-palestras', {
        nome,
        descricao,
        local,
        data_inicio: parseISO(data_inicio),
        data_fim: parseISO(data_fim),
        link,
        tipo,
        id_evento: evento
      }).then(() => {
        toast({
          title: "Palestra solicitada com sucesso",
          description: "Agora é só esperar o Administrador aprovar",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      })

      onClose();
      refetch();
      Router.reload();
    } catch (err) {
      console.log(err);
      toast({
        title: "Erro ao solicitar a palestra",
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
        leftIcon={<Icon mb="0.1rem" as={RiAddLine} fontSize="2rem" />}
        onClick={onOpen}
      >
        Nova palestra
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside" size="4xl">
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(handleCadastrar)}>
          <ModalHeader color="cores.cinzaEscuro">Solicitar nova palestra</ModalHeader>
          <ModalBody>
            <VStack spacing="8" mb="1rem">
              <Grid w="100%" templateColumns="repeat(4, 1fr)" gap="4">
                <GridItem colSpan={4}>
                  {
                    eventos && (
                      <SelectEvento eventos={eventos.eventos_ativos} evento={evento} setEvento={setEvento} />
                    )
                  }
                </GridItem>
              </Grid>
              <Grid w="100%" templateColumns="repeat(4, 1fr)" gap="4">
                <GridItem colSpan={2}>
                  <Input
                    name="nome"
                    label="Nome"
                    placeholder="Informe o nome da palestra"
                    {...register('nome')}
                    error={errors.nome}
                  />
                </GridItem>
                <GridItem colSpan={2}>
                  <Input
                    name="descricao"
                    label="Descrição"
                    placeholder="Palestra preparatória sobre programação na web"
                    {...register('descricao')}
                    error={errors.descricao}
                  />
                </GridItem>
              </Grid>
              <Grid w="100%" gap="4" templateColumns="repeat(6, 1fr)">
                <GridItem colSpan={2}>
                  <Input
                    name="local"
                    label="Local"
                    placeholder="Sala 5"
                    {...register('local')}
                    error={errors.local}
                  />
                </GridItem>
                <GridItem colSpan={2}>
                  <Input
                    name="data_inicio"
                    label="Inicio"
                    type="datetime-local"
                    {...register('data_inicio')}
                    error={errors.data_inicio}
                  />
                </GridItem>
                <GridItem colSpan={2}>
                  <Input
                    name="data_fim"
                    label="Fim"
                    type="datetime-local"
                    {...register('data_fim')}
                    error={errors.data_fim}
                  />
                </GridItem>
              </Grid>
              <Grid w="100%" gap="4" templateColumns="repeat(4, 1fr)">
                <GridItem colSpan={2}>
                  <SelectTipo tipo={tipo} setTipo={setTipo} />
                </GridItem>
                <GridItem colSpan={2}>
                <Input
                    name="link"
                    label="Link da palestra"
                    placeholder="Informar os caracteres depois do v="
                    {...register('link')}
                    error={errors.link}
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    isDisabled={tipo === 0 ? true : false}
                  />
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
              Solicitar 
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}