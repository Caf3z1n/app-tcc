import {
  Box,
  Button,
  Flex,
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
import { RiExternalLinkFill } from 'react-icons/ri'
import { api } from '../../services/apiClient';
import { Evento } from '../../services/hooks/useTodosEventos';

type AprovarReprovarPalestraProps = {
  evento: Evento;
}

export function DetalhesEvento({ evento }: AprovarReprovarPalestraProps) {
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
          <ModalHeader color="cores.cinzaEscuro">Informações do evento</ModalHeader>
          <ModalBody>
            <VStack fontWeight="medium" spacing="1rem" divider={<StackDivider borderColor="cores.cinzaBorda" />} color="cores.cinzaEscuro">
              <Box w="100%" textAlign="left">
                <Text fontWeight="medium" mb="0.8rem" fontSize="1.3rem">Evento</Text>
                <Flex mb="0.3rem">
                  <Text mr="0.3rem">Nome:</Text>
                  <Text color="cores.laranja" fontWeight="bold">{evento.nome}</Text>
                </Flex>
                <Text mb="0.3rem">Descrição: <strong>{evento.descricao}</strong></Text>
                <Text mb="0.3rem">Local: {evento.local}</Text>
                <Text mb="0.3rem">Inicio do evento: {format(parseISO(evento.data_inicio), 'dd/MM/yyyy')}</Text>
                <Text>Fim do evento: {format(parseISO(evento.data_fim), 'dd/MM/yyyy')}</Text>
              </Box>
              {
                evento.palestras.length >= 1 && (
                  <Box w="100%" textAlign="left">
                    <Text fontWeight="medium" mb="0.8rem" fontSize="1.3rem">Palestras</Text>
                    {
                      evento.palestras.map((palestra) => {
                        return (
                          <Text mb="0.5rem" key={palestra.id}>{format(parseISO(palestra.data_inicio), 'dd/MM/yyyy HH:mm')} - {palestra.nome}</Text>
                        )
                      })
                    }
                  </Box>
                )
              }
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button _focus={{ boxShadow: 'none' }} onClick={onClose}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}