import { Flex, Stack, Button, Image, useToast, Text }  from '@chakra-ui/react';

import { Input } from '../components/Form/Input';
import { withSSRGuest } from '../utils/withSSRGuest';
import Router from 'next/router';
import { useState } from 'react';
import { api } from '../services/apiClient';

export default function ValidarCetificado() {
  const [certificado, setCertificado] = useState('')
  const [downloadCertificado, setDownloadCertificado] = useState(null)
  const [loading, setLoading] = useState(false)
  const toast = useToast();

  async function handleValidar() {
    setLoading(true)
    try {
      const response = await api.get(`/certificados/${certificado}`)

      if(response.data.message === 'Certificado inválido') {
        setDownloadCertificado(null)
        toast({
          title: 'Certificado inválido',
          status: "error",
          duration: 2000,
          isClosable: true,
        })
      }else {
        setDownloadCertificado(response.data.certificado.url)
        toast({
          title: 'Certificado válido',
          status: "success",
          duration: 2000,
          isClosable: true,
        })
      }
    }catch(err) {
      toast({
        title: "Erro ao validar certificado",
        description: "Tente novamente mais tarde",
        status: "error",
        duration: 2000,
        isClosable: true,
      })
      setDownloadCertificado(null)
    }
    setLoading(false)
  }

  async function handleCertificado() {
    window.open(downloadCertificado, '_blank')
  }
  
  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        width="100%"
        maxW="25rem"
        p="2rem"
        bg="cores.branco"
        borderRadius="0.5rem"
        alignItems="center"
        flexDir="column"
        border="2px"
        borderColor="cores.cinzaBorda"
        shadow="lg"
      >
        <Image src="logo.svg" alt="logo" w="10rem" mb="2rem" />
        <Stack spacing="1rem" width="100%">
          <Input
            name="certificado"
            label="Código do certificado"
            value={certificado}
            onChange={(e) => setCertificado(e.target.value)}
          />
          {
            !!downloadCertificado && (
              <Button
                type="button"
                colorScheme="green"
                color="cores.branco"
                size="sm"
                _focus={{
                  boxShadow: 'none'
                }}
                onClick={() => handleCertificado()}
              >
                CONFERIR CERTIFICADO
              </Button>
            )
          }
          <Button
            type="submit"
            mt="1.75rem"
            bgColor="cores.laranja"
            color="cores.branco"
            size="lg"
            _hover={{
              bg: 'cores.laranjaEscuro'
            }}
            _active={{
              bg: 'cores.laranjaEscuro2'
            }}
            _focus={{
              boxShadow: 'none'
            }}
            onClick={handleValidar}
            isLoading={loading}
          >
            VALIDAR
          </Button>
          <Button
            type="button"
            mt="1.75rem"
            bgColor="cores.branco"
            color="cores.laranja"
            border="2px"
            size="lg"
            _hover={{
              bgColor: "rgba(0, 0, 0, 0.04)",
              color: 'cores.laranjaEscuro'
            }}
            _active={{
              bgColor: "rgba(0, 0, 0, 0.06)",
              color: 'cores.laranjaEscuro2'
            }}
            _focus={{
              boxShadow: 'none'
            }}
            onClick={() => Router.push('/')}
          >
            VOLTAR
          </Button>
        </Stack>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});
