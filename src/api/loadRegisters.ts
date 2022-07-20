import { query as q } from 'faunadb'
import { faunaClient } from '../clients/faunadb'
import { AppError } from '../errors/AppError';
import { safeVerifyError } from '../errors/FaunaErrorHandler';

import { Register } from '../interfaces/Register'

export async function loadRegisters(userEmail: string): Promise<{ data:Register[]}>{
  try{
    const registers = await faunaClient.query<{ data:Register[]}>(
      q.Map(
        q.Paginate(
          q.Match(
            q.Index('findByUserRef'),
            q.Select(
              ["ref"], 
              q.Get(
                q.Match(
                  q.Index("findByEmail"), 
                  userEmail
                )
              )
            )
          )
        ),
        q.Lambda( (obj) => q.Select(["data"], q.Get(obj)))
      )
    );

    return registers;
  }catch(err){
    const errorReason = safeVerifyError(err, [
      'requestResult',
      'responseContent',
      'errors', // The errors of the call
      0,
      'code'
    ]);

    if(errorReason !== 'instance not found'){
      throw new AppError('Busca','Registros não encontrados.')
    }

    throw err;
  }
}
