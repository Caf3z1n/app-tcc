import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  StackDivider,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { format, parseISO } from 'date-fns';
import { useState } from 'react';
import { RiExternalLinkFill } from 'react-icons/ri'
import { api } from '../../services/apiClient';
import { Palestra } from '../../services/hooks/useSolicitacaoPalestras'
import { Input } from '../Form/Input';

type DetalhesPalestraInscricaoProps = {
  palestra: Palestra;
}

export function DetalhesPalestraInscrito({ palestra }: DetalhesPalestraInscricaoProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  return (
    <>
      <Button
        type="button"
        bgColor="cores.laranja"
        color="cores.branco"
        size="sm"
        _hover={{
          bg: 'cores.laranjaEscuro'
        }}
        _active={{
          bg: 'cores.laranjaEscuro2'
        }}
        _focus={{
          boxShadow: 'none'
        }}
        leftIcon={<Icon mb="0.1rem" as={RiExternalLinkFill} fontSize="1.5rem" />}
        onClick={onOpen}
      >
        Abrir
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside" size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="cores.cinzaEscuro">Informações da Palestra</ModalHeader>
          <ModalBody>
            <VStack fontWeight="medium" spacing="1rem" divider={<StackDivider borderColor="cores.cinzaBorda" />} mb="4" color="cores.cinzaEscuro">
              <Box w="100%" textAlign="left">
                <Text fontWeight="medium" mb="0.8rem" fontSize="1.3rem">Palestrante</Text>
                <Flex mb="1rem" alignItems="center">
                  <Text mr="0.5rem">Foto: </Text>
                  <Image objectFit="cover" borderRadius="50%" alt="FOTO" src={palestra.palestrante.foto.url} w="5rem" h="5rem" />
                </Flex>
                <Text mb="0.3rem">Nome: <strong>{palestra.palestrante.nome}</strong></Text>
                <Text mb="0.3rem">Email: {palestra.palestrante.email}</Text>
              </Box>
              <Box w="100%" textAlign="left">
                <Text fontWeight="medium" mb="0.8rem" fontSize="1.3rem">Evento</Text>
                <Text mb="0.3rem">Nome: <strong>{palestra.evento.nome}</strong></Text>
                <Text mb="0.3rem">Descrição: {palestra.evento.descricao}</Text>
                <Text mb="0.3rem">Inicio do evento: {format(parseISO(palestra.evento.data_inicio), 'dd/MM/yyyy')}</Text>
                <Text mb="0.3rem">Fim do evento: {format(parseISO(palestra.evento.data_fim), 'dd/MM/yyyy')}</Text>
              </Box>
              <Box w="100%" textAlign="left">
                <Text fontWeight="medium" mb="0.8rem" fontSize="1.3rem">Palestra</Text>
                <Flex mb="0.3rem">
                  <Text mr="0.3rem">Nome: </Text>
                  <Text fontWeight="bold" color="cores.laranja">{palestra.nome}</Text>
                </Flex>
                <Text mb="0.3rem">Descrição: <strong>{palestra.descricao}</strong></Text>
                <Text mb="0.3rem">Tipo: {palestra.tipo === 0 ? 'Presencial' : palestra.tipo === 1 ? 'Presencial e Virtual': 'Virtual'}</Text>
                <Text mb="0.3rem">Local: {palestra.local}</Text>
                <Text mb="0.3rem">Dia da palestra: {format(parseISO(palestra.data_inicio), 'dd/MM/yyyy')}</Text>
                <Text mb="0.3rem">Horário do inicio: <strong>{format(parseISO(palestra.data_inicio), 'HH:mm')}</strong></Text>
                <Text mb="0.3rem">Horário do Fim: <strong>{format(parseISO(palestra.data_fim), 'HH:mm')}</strong></Text>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}