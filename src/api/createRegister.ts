import { query as q } from 'faunadb'
import { faunaClient } from '../clients/faunadb'
import { AppError } from '../errors/AppError';
import { safeVerifyError } from '../errors/FaunaErrorHandler';
import { FaunaRefObject } from '../interfaces/FaunaRefObject';

import { Register } from '../interfaces/Register'

interface FaunaRegisterResponse{
  ref: FaunaRefObject;
  data :Omit<Register,'ref'>
}

export async function createRegister(userEmail: string, register:Register): Promise<Register>{
  try{
    const { ref, data } = await faunaClient.query<FaunaRegisterResponse>(
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
    const newRegister = { ref, ...data };
    return newRegister

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
