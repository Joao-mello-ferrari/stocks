interface EmptyRowsProps{
  page: number;
  totalRegsCount: number;
  rowsPerPage: number;
  rowHeightObject: { height: string; }
  span: number;
}

export function EmptyRows({ 
  page, 
  totalRegsCount, 
  rowsPerPage,
  rowHeightObject,
  span 
}:EmptyRowsProps){

  const lastPage = getLastPage();
  const emptyRowsNum = ((lastPage+1)*rowsPerPage)-totalRegsCount;
  const baseVector = Array.from(Array(emptyRowsNum).keys());

  function getLastPage(){
    const possibleLast = Math.floor(totalRegsCount/rowsPerPage);
    if(totalRegsCount%rowsPerPage === 0) return Math.max(0,possibleLast-1);
    return possibleLast;
  }


  if(page === lastPage && totalRegsCount%rowsPerPage !== 0){
    return(
      <>
        { baseVector.map((num: number)=>{
          return(
            <tr key={num} style={rowHeightObject}>
              <td 
                colSpan={span} 
                className={`${num+1 === emptyRowsNum ? "" : "empty-row"}`}/>
            </tr>
          )
        })}
      </>
    )
  }

  return(
    <></>
  )

}