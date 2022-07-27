import { useEffect } from "react";
import { useToast } from '../../../contexts/toastContext'

import { FiCheckCircle, FiHelpCircle, FiAlertTriangle, FiXCircle } from "react-icons/fi";

import { animated } from 'react-spring';
import { Toast as ToastType } from "../../../interfaces/Toast";

import '../styles.scss'

interface ToastProps{
  data: ToastType;
  styles: object
}


const icons = {
  success: <FiCheckCircle />,
  warning: <FiHelpCircle />,
  error: <FiAlertTriangle />
}

const bg = {
  success: "#b7fa9f",
  warning: "#ffe893",
  error: "#FF978B"
}

export default function Toast({ data, styles }: ToastProps){
  const { removeToast } = useToast();

  useEffect(()=>{
    const removeTimer = setTimeout(()=>{
      removeToast(data.id)
    },3000);

    return ()=>{
      clearTimeout(removeTimer);
    }
    
  },[data.id, removeToast]);

  return(
    <animated.div className="toast" style={{backgroundColor: bg[data.type], ...styles}}>
      <div>
        <div className="title">
          { icons[data.type] }
          <strong>{data.title}</strong>
        </div>
        {data.message && <p>{data.message}</p>}
      </div>
      <FiXCircle onClick={()=>{removeToast(data.id)}}/>
    </animated.div>
  )
}