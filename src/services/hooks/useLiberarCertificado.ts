import { differenceInMinutes, parseISO } from 'date-fns';
import { useQuery } from 'react-query';

import { api } from '../apiClient';

export type Palestrante = {
  id: number;
  nome: string,
  email: string,
  createdAt: string,
  foto: {
    url: string;
  },
}

export type Espectador = {
  id: number;
  nome: string,
  email: string,
  createdAt: string,
  foto: {
    url: string;
  },
}

export type Palestra = {
  id: number,
  nome: string,
  descricao: string,
  local: string,
  link: string,
  tipo: number,
  ativo?: boolean,
  data_inicio: string,
  data_fim: string,
  createdAt: string,
  palestrante: Palestrante,
  status: string;
}

type getLiberarCertificadoResponse = {
  palestra: Palestra,
  espectadores: [{
    tempo_assistido: number,
    id: number,
    espectador: Espectador
  }]
  duracao_palestra: number,
}

type getLiberarCertificadoProps = {
  id: number,
}

type useLiberarCertificadoProps = {
  id: number,
}

export async function getLiberarCertificado({ id }: getLiberarCertificadoProps): Promise<getLiberarCertificadoResponse> {
  const { data } = await api.get(`/aprovar-certificados/${id}`);

  return {
    palestra: data.palestra,
    espectadores: data.espectadores_final,
    duracao_palestra: data.duracao_palestra,
  };
}

export function useLiberarCertificado({ id }: useLiberarCertificadoProps) {
  return useQuery(['liberar-certificados', [{id}]], () => getLiberarCertificado({ id }), {
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 30
  })
}
