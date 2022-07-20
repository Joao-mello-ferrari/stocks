import { Client } from 'faunadb'

const secret = import.meta.env.VITE_APP_FAUNADB_KEY
const domain = import.meta.env.VITE_APP_FAUNADB_DOMAIN

console.log(secret, domain)

export const faunaClient = new Client({
  secret,
  domain
});