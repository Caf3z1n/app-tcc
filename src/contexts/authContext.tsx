import { createContext, ReactNode, useEffect, useState } from 'react';
import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

import { api } from '../services/apiClient';

export type User = {
  id: number;
  nome: string;
  email: string;
  nivel: number;
  foto?: {
    preview: string,
    id: number
  };
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  nome: string;
  email: string;
  nivel: number;
  foto: {
    preview: string,
    id: number
  };
  user: User
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel;

export function signOut() {
  
  destroyCookie(undefined, 'webnar-athon.token', {
    path: '/',
  })
  destroyCookie(undefined, 'webnar-athon.selected-posto', {
    path: '/',
  })

  Router.push('/')
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [nivel, setNivel] = useState(2);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut();
          break;
        default:
          break;
      }
    }
  }, [])

  useEffect(() => {
    const { 'webnar-athon.token': token } = parseCookies();

    if (token) {
      api.get('/me').then(async response => {
        const { id, nome, email, nivel } = response.data;
        const fotinha = response.data.foto
        setUser({
          id,
          nome,
          email,
          nivel,
          foto: fotinha !== null ? {
            preview: fotinha.url,
            id: fotinha.id
          } : null
        })

        setNome(nome);
        setNivel(nivel);
        setEmail(email);
        if(fotinha !== null) {
          setFoto({
            preview: fotinha.url,
            id: fotinha.id
          })
        }
      })
      .catch(() => {
        signOut()
      })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post('/session', {
      email,
      password
    })
    
    const { token, profile } = response.data;
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    Router.reload();

    setCookie(undefined, 'webnar-athon.token', token, {
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      path: '/'
    })

    setUser({
      id: profile.id,
      nome: profile.nome,
      email: profile.email,
      nivel: profile.nivel,
    })

    Router.push('/admin/aprovar-palestrante');
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, nome, nivel, email, foto, user }}>
      {children}
    </AuthContext.Provider>
  )
}