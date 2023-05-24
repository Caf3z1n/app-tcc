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

type getAdminPalestrasResponse = {
  palestras: Palestra[];
  paginacao: {
    paginaAtual: number,
		itensPorPagina: number,
		quantidadeTotalDeItens: number
  };
}

type getAdminPalestrasProps = {
  page: number,
}

type useAdminPalestrasProps = {
  page: number,
}

export async function getAdminPalestras({ page }: getAdminPalestrasProps): Promise<getAdminPalestrasResponse> {
  const { data } = await api.get(`/admin-palestras?paginaAtual=${page}`);

  return {
    palestras: data.palestras,
    paginacao: data.paginacao
  };
}

export function useAdminPalestras({ page }: useAdminPalestrasProps) {
  return useQuery(['admin-palestras', [{ page }]], () => getAdminPalestras({ page }), {
    staleTime: 1000 * 60
  })
}
