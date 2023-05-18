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

type AprovarReprovarPalestraProps = {
  palestra: Palestra;
  refetch: () => void;
}

export function DetalhesPalestra({ palestra, refetch }: AprovarReprovarPalestraProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [link, setLink] = useState(palestra.link);
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const toast = useToast();

  async function handleSalvarLink() {
    setLoading(true);
    try {
      await api.post(`/palestras/${palestra.id}`, {
        link
      })

      toast({
        title: "Link salvo com sucesso",
        description: "O link será redistribuido caso seja o horário da palestra",
        status: "success",
        duration: 2000,
        isClosable: true,
      })
    }catch (err) {
      toast({
        title: "Erro ao salvar palestra",
        description: "Tente novamente mais tarde",
        status: "error",
        duration: 2000,
        isClosable: true,
      })
    }
    setLoading(false);
    onClose()
    refetch()
  }

  async function handleCancelarPalestra() {
    setLoading2(true);
    try {
      await api.delete(`/palestras/${palestra.id}`)

      toast({
        title: "Palestra cancelada com sucesso",
        description: "Observação: só é possivel cancelar a palestra antes de ser aprovada",
        status: "success",
        duration: 2000,
        isClosable: true,
      })
    }catch (err) {
      toast({
        title: "Erro ao cancelar palestra",
        description: "Tente novamente mais tarde",
        status: "error",
        duration: 2000,
        isClosable: true,
      })
    }
    setLoading2(false);
    onClose()
    refetch()
  }
  
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
                {
                  palestra.tipo !== 0 && (
                  <Grid w="100%" gap="4" templateColumns="repeat(1, 1fr)" mt="1rem">
                      <GridItem colSpan={1}>
                        <Input
                          name="link"
                          label="Link da palestra:"
                          placeholder="Informar os caracteres depois do v="
                          value={link}
                          onChange={(e) =>setLink(e.target.value)}
                        />
                      </GridItem>
                    </Grid>
                  )
                }
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            {
              palestra.ativo === null && (
                <Button
                  type="button"
                  colorScheme="red"
                  color="cores.branco"
                  size="md"
                  _focus={{
                    boxShadow: 'none'
                  }}
                  mr="1rem"
                  onClick={handleCancelarPalestra}
                  isLoading={loading2}
                >
                  Cancelar palestra
                </Button>
              )
            }
            {
              palestra.tipo !== 0 && (
                <Button
                  type="button"
                  colorScheme="green"
                  color="cores.branco"
                  size="md"
                  _focus={{
                    boxShadow: 'none'
                  }}
                  onClick={handleSalvarLink}
                  isLoading={loading}
                >
                  Salvar
                </Button>
              )
            }
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}