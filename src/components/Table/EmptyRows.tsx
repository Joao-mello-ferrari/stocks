interface EmptyRowsProps{
  page: number;
  totalRegsCount: number;
  rowsPerPage: number;
  rowHeightObject: { height: string; }
}

export function EmptyRows({ 
  page, 
  totalRegsCount, 
  rowsPerPage,
  rowHeightObject 
}:EmptyRowsProps){

  const lastPage = getLastPage();
  const emptyRowsNum = ((lastPage+1)*rowsPerPage)-totalRegsCount;
  const baseVector = Array.from(Array(emptyRowsNum).keys());

  function getLastPage(){
    const possibleLast = Math.floor(totalRegsCount/rowsPerPage);
    if(totalRegsCount%rowsPerPage === 0) return Math.max(0,possibleLast-1);
    return possibleLast;
  }


  if(page === lastPage-1 || totalRegsCount%page === 0 || page === 0){
    return(
      <>
        { baseVector.map((num: number)=>{
          return(
            <tr key={num} style={rowHeightObject}>
              <td 
                colSpan={6} 
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