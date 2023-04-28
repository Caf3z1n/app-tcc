import { Flex, FormLabel, Select } from "@chakra-ui/react";
import { useHomeEventos } from "../../services/hooks/useHomeEventos";
import { Evento } from "../../services/hooks/useHomeEventos";

type SelectEventoProps = {
  eventos: Evento[],
  evento: number,
  setEvento: (evento: number) => void;
}

export default function SelectEvento({ eventos, evento, setEvento }: SelectEventoProps) {
  const changeEvento = (event: any) => {
    setEvento(event.target.value)
  }

  setEvento(Number(eventos[0].id))

  return (
    <Flex flexDir="column" mr="1rem" w="100%">
      <FormLabel fontSize={["1rem", "1.2rem"]} color="cores.cinzaEscuro">Selecione o evento</FormLabel>
      <Select defaultValue="nome" size="lg" focusBorderColor="cores.verde" onChange={changeEvento}>
        {
          eventos.map((eventoA) => {
            return (
              <option key={eventoA.id} value={eventoA.id}>{eventoA.nome}</option>
            )
          })
        }
      </Select>
    </Flex>
  )
}