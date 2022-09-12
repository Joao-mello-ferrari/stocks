import ContentLoader from "react-content-loader";
import { formatCurrencyToDisplay } from "../../../helpers/numbersFormatters";

function LoaderSkeleton(){
  return(
    <ContentLoader
      speed={2}
      height={48}
      viewBox="0 0 750 160"
      backgroundColor="#E9EDFF"
      foregroundColor="#1b1f47"
    >
      <rect x="0" y="64" rx="11" ry="11" width="360" height="24" /> 
      <rect x="0" y="100" rx="15" ry="15" width="400" height="32" /> 
    </ContentLoader>
  )
}

function Error(){
  return(
    <div style={{
      margin: 'auto 0 1.4rem 1rem',
      width: '8rem',
      height: '0.12rem',
      background: '#1b1f47'
    }}/>
  )
}

export function getContent(
  loading: boolean, 
  error: boolean, 
  value: number
){
  if(loading) return <LoaderSkeleton/>
  if(error) return <Error/>
  return <strong>{ formatCurrencyToDisplay(String(value)) }</strong>
}