import { Flex, FormLabel } from "@chakra-ui/react";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import { subDays } from 'date-fns';

interface PesquisarProps {
  selectedDates: Date[];
  setSelectedDates: (selectedDates: Date[]) => void;}

export default function Periodo({ selectedDates, setSelectedDates }: PesquisarProps) {
  return (
    <Flex w="100%" flexDir="column">
      <FormLabel color="cores.cinzaEscuro" fontSize="1rem">Período</FormLabel>
      <RangeDatepicker configs={{
        dateFormat: 'dd/MM/yyyy',
        dayNames: 'Dom Seg Ter Qua Qui Sex Sab'.split(' '),
        monthNames: 'Janeiro Fevereiro Março Abril Maio Junho Julho Agosto Setembro Outubro Novembro Dezembro'.split(' ')
      }} propsConfigs={{
        dateNavBtnProps: {
          color: "cores.laranja",
          variant: "ghost",
          _focus: {
            boxShadow: 'none'
          },
          _hover: {
            background: 'rgba(254, 157, 43, 0.3)',
          }
        },
        dayOfMonthBtnProps: {
          defaultBtnProps: {
            _focus: {
              boxShadow: 'none'
            },
            fontWeight: 'medium',
            _hover: {
              background: 'rgba(254, 157, 43, 0.8)',
            },
            color: 'cores.cinzaEscuro',
            _disabled: { color: 'cores.cinza', bg:  'rgba(0, 0, 0, 0.05)' }
          },
          isInRangeBtnProps: {
            background: "rgba(254, 157, 43, 0.3)",
          },
          selectedBtnProps: {
            background: "rgba(254, 157, 43, 0.7)",
          },
          todayBtnProps: {
            borderColor: "cores.laranjaEscuro2",
          },
        },
        inputProps: {
          focusBorderColor: "cores.laranja",
          size: "lg"
        },
        popoverCompProps: {
          popoverContentProps: {
            color: "cores.cinzaEscro",
          },
        },
      }} minDate={subDays(new Date(), 1)} selectedDates={selectedDates} onDateChange={setSelectedDates}  />
    </Flex>
  )
}