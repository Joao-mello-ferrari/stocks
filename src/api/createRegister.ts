import { query as q } from 'faunadb'
import { faunaClient } from '../clients/faunadb'
import { AppError } from '../errors/AppError';
import { safeVerifyError } from '../errors/FaunaErrorHandler';

import { Register } from '../interfaces/Register'

export async function createRegister(userEmail: string, register:Register): Promise<{ data:Register}>{
  try{
    const newRegister = await faunaClient.query<{ data:Register}>(
      q.Create(
        q.Collection('stocks'),
        {
          data: {
            ...register,
            userId: q.Select(
              ["ref"], 
              q.Get(
                q.Match(
                  q.Index("findByEmail"), 
                  userEmail
                )
              )
            )
          },
        },
        )
    );

    return newRegister;

  }catch(err){
    const errorReason = safeVerifyError(err, [
      'requestResult',
      'responseContent',
      'errors', // The errors of the call
      0,
      'code'
    ]);

    if(errorReason === 'instance not found'){
      throw new AppError('Criação','Banco de dados não encontrado.')
    }

    throw err;
  }
}
