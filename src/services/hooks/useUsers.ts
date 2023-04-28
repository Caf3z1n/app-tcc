import { useQuery } from 'react-query';

import { api } from '../apiClient';

type Usuario = {
  id: number,
  nome: string,
  email: string,
  createdAt: string,
  nivel: number,
  foto?: {
    url: string
  }
}

type getUsuariosResponse = {
  usuarios: Usuario[];
  paginacao: {
    paginaAtual: number,
		itensPorPagina: number,
		quantidadeTotalDeItens: number
  };
}

type getUsuariosProps = {
  page: number,
}

type useUsuariosProps = {
  page: number,
}

export async function getUsuarios({ page }: getUsuariosProps): Promise<getUsuariosResponse> {
  const { data } = await api.get(`/users?paginaAtual=${page}`);

  return {
    usuarios: data.users,
    paginacao: data.paginacao
  };
}

export function useUsuarios({ page }: useUsuariosProps) {
  return useQuery(['usuarios', [{ page }]], () => getUsuarios({ page }), {
    staleTime: 1000 * 1
  })
}
