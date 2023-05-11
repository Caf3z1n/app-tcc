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
  status: string;
}

type getPalestrasDisponeisResponse = {
  palestras: Palestra[];
  paginacao: {
    paginaAtual: number,
		itensPorPagina: number,
		quantidadeTotalDeItens: number
  };
}

type getPalestrasDisponeisProps = {
  page: number,
}

type usePalestrasDisponiveisProps = {
  page: number,
}

export async function getPalestrasDisponeis({ page }: getPalestrasDisponeisProps): Promise<getPalestrasDisponeisResponse> {
  const { data } = await api.get('/palestras-disponiveis');

  return {
    palestras: data.palestras,
    paginacao: data.paginacao
  };
}

export function usePalestrasDisponiveis({ page }: usePalestrasDisponiveisProps) {
  return useQuery(['palestras-disponiveis', [{ page }]], () => getPalestrasDisponeis({ page }), {
    staleTime: 1000 * 60
  })
}
