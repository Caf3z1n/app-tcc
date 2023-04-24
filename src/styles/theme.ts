import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    cores: {
      fundo: '#F0F2F5',
      laranja: '#FE9D2B',
      laranjaEscuro: '#F29429',
      laranjaEscuro2: '#E68D27',
      cinza: '#969CB2',
      cinzaEscuro: '#363F5F',
      neveClara: '#FCFDFE',
      cinzaBorda: '#DFE0EB',
      branco: '#FFF',
      preto: '#1A1818'
    }
  },
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  },
  styles: {
    global: {
      body: {
        bg: 'cores.fundo',
        bgImage: '../fundo.svg',
        _focus: {
          boxShadow: 'none'
        },
      },
      html: {
        fontSize: ['12px', '16px']
      }
    }
  }
})
