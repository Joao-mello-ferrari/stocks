import { query as q } from 'faunadb'
import { faunaClient } from '../clients/faunadb'
import { AppError } from '../errors/AppError';
import { safeVerifyError } from '../errors/FaunaErrorHandler';

import { Register } from '../interfaces/Register'
import { FaunaRefObject } from '../interfaces/FaunaRefObject'

interface FaunaRegisterResponse{
  ref: FaunaRefObject;
  data :Omit<Register,'ref'>
}

export async function updateRegister(
  registerRef: FaunaRefObject, 
  register: Omit<Register, 'ref'>
): Promise<Register>{

  try{
    const { ref, data } = await faunaClient.query<FaunaRegisterResponse>(
      q.Update(
        q.Ref(
          q.Collection(registerRef.value.collection.value.id), 
          registerRef.value.id
        ),
        { data: register }
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
      throw new AppError('Edição','Registro não encontrado.')
    }

    throw err;
  }
}
