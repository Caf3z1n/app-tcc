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

type getPalestrasAgoraResponse = {
  palestras: [{
    palestra: Palestra
  }];
}

export async function getPalestrasAgora(): Promise<getPalestrasAgoraResponse> {
  const { data } = await api.get(`/palestras-aovivo`);

  return {
    palestras: data,
  };
}

export function usePalestrasAgora() {
  return useQuery(['palestras-aovivo'], () => getPalestrasAgora(), {
    staleTime: 1000 * 30
  })
}
