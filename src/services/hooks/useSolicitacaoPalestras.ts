import { useQuery } from 'react-query';

import { api } from '../apiClient';

export type Evento = {
  id: number;
  nome: string,
  descricao: string,
  local: string,
  data_inicio: string,
  data_fim: string,
}

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
  evento: Evento,
}

type getSolicitacaoPalestranteResponse = {
  palestras: Palestra[];
}

export async function getSolicitacaoPalestras(): Promise<getSolicitacaoPalestranteResponse> {
  const { data } = await api.get('/solicitar-palestras');

  return {
    palestras: data,
  };
}

export function useSolicitacaoPalestras() {
  return useQuery(['solicitacao-palestras'], () => getSolicitacaoPalestras(), {
    staleTime: 1000 * 60
  })
}
