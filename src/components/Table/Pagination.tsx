interface PaginationProps{
  page: number;
  total: number;
  rowsPerPage: number;
  onNavigate: React.Dispatch<React.SetStateAction<number>>;
}

export function Pagination({ 
  page, 
  total, 
  rowsPerPage, 
  onNavigate 
}: PaginationProps){
  const totalPages = Math.ceil(total/rowsPerPage);
  const adjacentNumToRender = 2;
  const borderNumberToRender = 1;

  const startButtonsArray = []
  const adjacentButtonsArray = []
  const endButtonsArray = []

  // If first buttons will need to be rendered apart
  if(page - adjacentNumToRender > 1){
    // Add those buttons to startButtonsArray array
    for(let i=1; i <= borderNumberToRender; i++){
      if(i >= page - adjacentNumToRender) break;
      startButtonsArray.push(i);
    }
  }

  // Append adjacent buttons to adjacentButtonsArray
  let start = Math.max(1, page-adjacentNumToRender);
  let end = Math.min(totalPages, page+adjacentNumToRender);
  for(start; start <= end; start++){
    adjacentButtonsArray.push(start);
  }

  // If end buttons will need to be rendered apart
  if(!(page+adjacentNumToRender >= totalPages)){
    let start = Math.max(page+adjacentNumToRender, totalPages-borderNumberToRender) + 1;
    // Add those buttons to endButtonsArray array
    for(start; start <= totalPages; start++){
      endButtonsArray.push(start);
    }
  }

  function changePage(e: React.MouseEvent<HTMLButtonElement>){
   onNavigate(Number(e.currentTarget.name)-1);
  }

  return(
    <>
      { startButtonsArray.length !== 0 &&
        startButtonsArray.map((index)=>(
          <button 
            key={index} 
            onClick={changePage}
            name={String(index)}
          >
            {index}
          </button>
        ))
      }

      { startButtonsArray[startButtonsArray.length-1] < page-adjacentNumToRender-1 &&
        <span> ... </span>
      }

      { adjacentButtonsArray.map((index)=>{
          if(index === page){
            return(
              <button 
                key={index} 
                className="selected" 
                onClick={changePage}
                name={String(index)}
              >
                {index}
              </button>
            )
          }
          return(
            <button 
              key={index} 
              onClick={changePage}
              name={String(index)}
            >
              {index}
            </button>
          )
        })
      }

      { endButtonsArray[0] > page+adjacentNumToRender+1 &&
        <span> ... </span>
      }

      { endButtonsArray.length !== 0 &&
        endButtonsArray.map((index)=>(
          <button 
            key={index} 
            onClick={changePage}
            name={String(index)}
          >
            {index}
          </button>
        ))
      }
    </>
  )
}