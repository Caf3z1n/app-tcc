import { Box, Stack, Text, } from "@chakra-ui/react";
import { ReactNode } from 'react';

interface NavSectionProps {
  title: string;
  children: ReactNode;
}

export function NavSection({ title, children }: NavSectionProps) {
  return (
    <Box>
      <Text fontWeight="bold" color="cores.cinza" fontSize="1rem">{title}</Text>
      <Stack spacing="1rem" mt="1rem" align="stretch" fontSize="1rem">
        {children}
      </Stack>
    </Box>
  )
}