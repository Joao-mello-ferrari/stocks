import { query as q } from 'faunadb'
import { faunaClient } from '../clients/faunadb'
import { AppError } from '../errors/AppError';
import { safeVerifyError } from '../errors/FaunaErrorHandler';

interface LoginUser{
  name: string;
  email: string;
  googleId: string;
  givenName: string;
}

interface FaunaUser{
  data: LoginUser;
  ref: object
  ts: number;
}

export async function login( user: LoginUser ){
  let userRef = null;
  try{
    userRef = await faunaClient.query(
      q.Select(
        ["data"],
        q.Get(
          q.Match(
            q.Index("findByEmail"),
            user.email
          )
        )
      )
    )
  } catch(err){ 
    const errorReason = safeVerifyError(err, [
      'requestResult',
      'responseContent',
      'errors', // The errors of the call
      0,
      'code'
    ]);

    if(errorReason !== 'instance not found'){
      throw new AppError('Login','Erro ao logar.')
    }
  }

  // If null, create new user
  if(userRef === null){
    try{
      const response = await faunaClient.query<FaunaUser>(
        q.Create(
          q.Collection('users'),
          {
            data: user
          },
        )
      );
      userRef = response.ref;

    }catch(err){
      throw new AppError('Login','Usuário não encontrado.');
    }
  }

  return true;
}