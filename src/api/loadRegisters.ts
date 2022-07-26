import { query as q } from 'faunadb'
import { faunaClient } from '../clients/faunadb'
import { AppError } from '../errors/AppError';
import { safeVerifyError } from '../errors/FaunaErrorHandler';

import { Register } from '../interfaces/Register'
import { FaunaRefObject } from '../interfaces/FaunaRefObject'

interface FaunaRegisterResponse{
  data:[
    FaunaRefObject,
    Omit<Register,'ref'>
  ][]
}

// export async function loadRegisters(userEmail: string): Promise<Register[]>{
export async function loadRegisters(): Promise<Register[]>{
  
  const userEmail  = 'joao.vico.mellof@gmail.com';
  try{
    const registers = await faunaClient.query<FaunaRegisterResponse>(
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
        q.Lambda("obj",[
          q.Select(["ref"], q.Get(q.Var("obj"))),
          q.Select(["data"], q.Get(q.Var("obj")))
        ])
      )
    );

    const mappedRegs = registers.data
      .map((subArray: [FaunaRefObject, Omit<Register,'ref'>]) => {
        return{
          ref: subArray[0],
          ...subArray[1]
        }
      })
    return mappedRegs
    
  }catch(err){
    const errorReason = safeVerifyError(err, [
      'requestResult',
      'responseContent',
      'errors', // The errors of the call
      0,
      'code'
    ]);

    if(errorReason === 'instance not found'){
      throw new AppError('Busca','Registros não encontrados.')
    }

    throw err;
  }
}
