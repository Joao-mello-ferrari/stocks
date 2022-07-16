import Toast from './Toast'
import { useTransition } from 'react-spring'

import { Toast as ToastType } from '../../interfaces/Toast'

interface ToastContainerProps{
  toasts: ToastType[];
}

export function ToastsContainer({ toasts }: ToastContainerProps){
  const styledToasts = useTransition(
    toasts, 
    {
      from: { right: '-120%' },
      enter:{right: '0%'},
      leave: { right: '-120%' },
    })

  return(
    <div className="toast-container" style={{overflow: 'hidden'}}>
      {styledToasts((styles, item)=>(
        <Toast key={item.id} data={item} styles={styles}/>
      ))}
    </div>
  )
}