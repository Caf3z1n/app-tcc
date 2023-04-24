import axios from 'axios';
import { parseCookies } from 'nookies';

export function setupAPIClient(ctx = undefined) {  
  let cookies = parseCookies(ctx);

  const api = axios.create({
    //baseURL: 'http://localhost:3334',
    baseURL: 'https://api.tcc.eticasistemas.com.br',
    headers: {
      Authorization: `Bearer: ${cookies['webnar-athon.token']}`
    }
  })

  return api;
}