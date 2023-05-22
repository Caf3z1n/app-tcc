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

type getMinhasPalestrasResponse = {
  palestras: Palestra[];
  paginacao: {
    paginaAtual: number,
		itensPorPagina: number,
		quantidadeTotalDeItens: number
  };
}

type getMinhasPalestrasProps = {
  page: number,
}

type useMinhasPalestrasProps = {
  page: number,
}

export async function getMinhasPalestras({ page }: getMinhasPalestrasProps): Promise<getMinhasPalestrasResponse> {
  const { data } = await api.get(`/palestras?paginaAtual=${page}`);

  return {
    palestras: data.palestras,
    paginacao: data.paginacao
  };
}

export function useMinhasPalestras({ page }: useMinhasPalestrasProps) {
  return useQuery(['minhas-palestras', [{ page }]], () => getMinhasPalestras({ page }), {
    staleTime: 1000 * 60
  })
}
