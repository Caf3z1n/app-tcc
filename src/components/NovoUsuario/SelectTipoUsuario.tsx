import { Flex, FormLabel, Select } from "@chakra-ui/react";

type SelectTipoProps = {
  tipo: number,
  setTipo: (tipo: number) => void;
}

export default function SelectTipoUsuario({ tipo, setTipo }: SelectTipoProps) {
  const changeTipo = (event: any) => {
    setTipo(Number(event.target.value))
  }

  return (
    <Flex flexDir="column" mr="1rem" w="100%">
      <FormLabel fontSize="1rem" color="cores.cinzaEscuro">Selecione o tipo</FormLabel>
      <Select defaultValue="nome" size="lg" focusBorderColor="cores.verde" onChange={changeTipo}>
        <option value={0} selected>Administrador</option>
        <option value={1}>Palestrante</option>
        <option value={2}>Espectador</option>
      </Select>
    </Flex>
  )
}