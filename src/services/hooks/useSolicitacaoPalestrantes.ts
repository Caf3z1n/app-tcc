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

type getSolicitacaoPalestranteResponse = {
  palestrantes: Palestrante[];
  paginacao: {
    paginaAtual: number,
		itensPorPagina: number,
		quantidadeTotalDeItens: number
  };
}

type getSolicitacaoPalestrantesProps = {
  page: number,
}

type useSolicitacaoPalestrantesProps = {
  page: number,
}

export async function getSolicitacaoPalestrantes({ page }: getSolicitacaoPalestrantesProps): Promise<getSolicitacaoPalestranteResponse> {
  const { data } = await api.get(`/solicitar-palestrante?paginaAtual=${page}`);

  return {
    palestrantes: data.palestrantes,
    paginacao: data.paginacao
  };
}

export function useSolicitacaoPalestrantes({ page }: useSolicitacaoPalestrantesProps) {
  return useQuery(['solicitacao-palestrantes', [{ page }]], () => getSolicitacaoPalestrantes({ page }), {
    staleTime: 1000 * 1
  })
}
