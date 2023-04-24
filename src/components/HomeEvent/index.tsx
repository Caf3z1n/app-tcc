import { Flex, Image, Text } from "@chakra-ui/react";
import { Evento } from "../../services/hooks/useHomeEventos";

import { format, parseISO } from 'date-fns'

type HomeEventProps = {
  evento: Evento
}

export default function HomeEvent({ evento }: HomeEventProps) {
  return (
    <Flex shadow="xl" justifyContent="space-between" flexDirection="column" w="100%" maxW="25rem" borderRadius="8px" p="1rem" bgColor="cores.branco">
      <Text mb="1rem" color="cores.preto" fontSize="1.5rem" fontWeight="medium">{evento.nome}</Text>
      <Text mb="3rem" fontStyle="italic" color="cores.preto" fontSize="1rem" fontWeight="medium">{evento.descricao}</Text>
      <Text mb="1rem" color="cores.preto" fontSize="1rem" fontWeight="bold">{evento.local}</Text>
      <Flex justifyContent="space-between" alignItems="center" alignContent="flex-end">
        <Flex flexDirection="column">
          <Text color="cores.preto" fontSize="1rem" fontWeight="medium">Inicio: {format(parseISO(evento.data_inicio), 'dd/MM/yyyy')}</Text>
          <Text color="cores.preto" fontSize="1rem" fontWeight="medium">Fim: {format(parseISO(evento.data_fim), 'dd/MM/yyyy')}</Text>
        </Flex>
        <Image src="icone.svg" alt="logo" w="2.5rem" />
      </Flex>
    </Flex>
  )
}