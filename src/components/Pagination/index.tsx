import { Box, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

  const previusPages = currentPage > 1
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage  -1)
    : []

  const nextPages = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : []
  

  const inicio = (currentPage - 1) * registersPerPage + 1
  const fim = registersPerPage >= totalCountOfRegisters
    ? totalCountOfRegisters
    : inicio === totalCountOfRegisters
    ? inicio
    : currentPage * registersPerPage

  return (
    <Stack
      direction={["column", "row"]}
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box color="cores.cinzaEscuro">
        <strong>{totalCountOfRegisters === 0 ? 0 : inicio}°</strong> ao <strong>{fim < totalCountOfRegisters ? fim : totalCountOfRegisters}°</strong> de <strong>{totalCountOfRegisters} registros</strong>
      </Box>
      <Stack direction="row" spacing="2">

        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {currentPage > (2 + siblingsCount) && (
              <Text color="gray.300" w="8" textAlign="center">...</Text>
            )}
          </>
        )}

        {previusPages.length > 0 && previusPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        })}
        
        <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />

        {nextPages.length > 0 && nextPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        })}

        {(currentPage + siblingsCount) < lastPage && (
          <>
            {(currentPage + 1 + siblingsCount) < lastPage && (
              <Text color="cores.cinzaEscuro" w="8" textAlign="center">...</Text>
            )}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}

      </Stack>
    </Stack>
  )
}