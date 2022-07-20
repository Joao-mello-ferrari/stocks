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

    if(errorReason !== 'instance not found'){
      throw new AppError('Busca','Registros não encontrados.')
    }

    throw err;
  }
}
 
//  

    
  // const data = await faunaClient.query(
  //   q.Select(
  //     ["data", "name"],
  //     q.Get(
  //       q.Match(
  //         q.Index("findByUserRef"),
  //         q.Select(["ref"], 
  //           q.Get(
  //             q.Match(
  //               q.Index("findByEmail"), 
  //               'joao'
  //             )
  //           )
  //         )
  //       )
  //     )
  //   )
  // )

  // console.log(a)  // const response = await faunaClient.query(
  //  