import axios from 'axios';

export const nouApiStorageKey = '@nou:token';

const storageToken = localStorage.getItem(nouApiStorageKey);

export function setupNouApiClient() {
  const nouApi = axios.create({
    baseURL: 'http://localhost:3333/api',
  });

  return nouApi;
}
