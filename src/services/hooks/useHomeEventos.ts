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

type getHomeEventosResponse = {
  eventos_ativos: Evento[];
  eventos_passados: Evento[];
}

export async function getHomeEventos(): Promise<getHomeEventosResponse> {
  const { data } = await api.get(`/home-eventos`);

  return {
    eventos_ativos: data.eventos_ativos,
    eventos_passados: data.eventos_passados
  };
}

export function useHomeEventos() {
  return useQuery(['home-eventos'], () => getHomeEventos(), {
    staleTime: 1000 * 60
  })
}
