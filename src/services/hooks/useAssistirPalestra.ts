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

type getAssistirPalestraResponse = {
  espectadorPalestra: {
    palestra: Palestra
  }
}

type getAssistirPalestraProps = {
  id: number,
}

type useAssistirPalestraProps = {
  id: number,
}

export async function getAssistirPalestra({ id }: getAssistirPalestraProps): Promise<getAssistirPalestraResponse> {
  const { data } = await api.get(`/palestras/${id}`);

  return {
    espectadorPalestra: data.espectadorPalestra,
  };
}

export function useAssistirPalestra({ id }: useAssistirPalestraProps) {
  return useQuery(['assistir-palestra'], () => getAssistirPalestra({ id }), {
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 30
  })
}
