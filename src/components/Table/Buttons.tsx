export function Buttons(){
  const currentPage = 10;
  const totalPages = 10;
  const adjacentNumToRender = 2;
  const borderNumberToRender = 1;

  const startButtonsArray = []
  const adjacentButtonsArray = []
  const endButtonsArray = []

  // If first buttons will need to be rendered apart
  if(currentPage - adjacentNumToRender > 1){
    // Add those buttons to startButtonsArray array
    for(let i=1; i <= borderNumberToRender; i++){
      if(i >= currentPage - adjacentNumToRender) break;
      startButtonsArray.push(i);
    }
  }

  // Append adjacent buttons to adjacentButtonsArray
  let start = Math.max(1, currentPage-adjacentNumToRender);
  let end = Math.min(totalPages, currentPage+adjacentNumToRender);
  for(start; start <= end; start++){
    adjacentButtonsArray.push(start);
  }

  // If end buttons will need to be rendered apart
  if(!(currentPage+adjacentNumToRender >= totalPages)){
    let start = Math.max(currentPage+adjacentNumToRender, totalPages-borderNumberToRender) + 1;
    // Add those buttons to endButtonsArray array
    for(start; start <= totalPages; start++){
      endButtonsArray.push(start);
    }
  }

  return(
    <>
      { startButtonsArray.length !== 0 &&
        startButtonsArray.map((index)=>(
          <button key={index}>
            {index}
          </button>
        ))
      }

      { startButtonsArray[startButtonsArray.length-1] < currentPage-1 && 
        <span> ... </span>
      }

      { adjacentButtonsArray.map((index)=>{
          if(index === currentPage){
            return(
              <button key={index} className="selected">
                {index}
              </button>
            )
          }
          return(
            <button key={index}>
              {index}
            </button>
          )
        })
      }

      { endButtonsArray[0] > currentPage+1 && 
        <span> ... </span>
      }

      { endButtonsArray.length !== 0 &&
        endButtonsArray.map((index)=>(
          <button key={index}>
            {index}
          </button>
        ))
      }
    </>
  )
}