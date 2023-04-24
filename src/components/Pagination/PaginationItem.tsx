import { Button } from '@chakra-ui/react';

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        bg="cores.laranja"
        disabled
        color="#FFF"
        _disabled={{
          cursor:'default'
        }}
        _hover={{
          bg: 'cores.laranjaEscuro'
        }}
        _active={{bgColor: 'cores.laranjaEscuro2'}}
      >
        {number}
      </Button>
    )
  }
  return (
    <Button
      size="sm"
      fontSize="xs"
      color="cinzaEscuro"
      bg='transparent'
      _hover={{
        bg: 'cores.laranja',
        color: "#fff"
      }}
      _active={{bgColor: 'cores.laranjaEscuro2'}}
      border="2px"
      borderColor="cores.laranja"
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  )
}