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
  porcentagem: number,
  id_espectador_palestra: number,
}

type getPalestrasInscritasResponse = {
  palestras: Palestra[];
  paginacao: {
    paginaAtual: number,
		itensPorPagina: number,
		quantidadeTotalDeItens: number
  };
}

type getPalestrasInscritasProps = {
  page: number,
}

type usePalestrasInscritasProps = {
  page: number,
}

export async function getPalestrasInscritas({ page }: getPalestrasInscritasProps): Promise<getPalestrasInscritasResponse> {
  const { data } = await api.get('/espectador-palestra');

  return {
    palestras: data.palestras,
    paginacao: data.paginacao
  };
}

export function usePalestrasInscritas({ page }: usePalestrasInscritasProps) {
  return useQuery(['palestras-inscritas', [{ page }]], () => getPalestrasInscritas({ page }), {
    staleTime: 1000 * 60
  })
}
