import { useQuery } from 'react-query';

import { api } from '../apiClient';
import { Palestra } from './useSolicitacaoPalestras';

export type Evento = {
  id: number;
  nome: string,
  descricao: string,
  local: string,
  data_inicio: string,
  data_fim: string,
  palestras: Palestra[];
}

type getTodosEventosResponse = {
  eventos: Evento[];
  paginacao: {
    paginaAtual: number,
		itensPorPagina: number,
		quantidadeTotalDeItens: number
  };
}

type getTodosEventosProps = {
  page: number,
}

type useTodosEventosProps = {
  page: number,
}

export async function getTodosEventos({ page }: getTodosEventosProps): Promise<getTodosEventosResponse> {
  const { data } = await api.get(`/eventos?paginaAtual=${page}`);

  return {
    eventos: data.eventos,
    paginacao: data.paginacao
  };
}

export function useTodosEventos({ page }: useTodosEventosProps) {
  return useQuery(['todos-eventos', [{ page }]], () => getTodosEventos({ page }), {
    staleTime: 1000 * 60
  })
}
