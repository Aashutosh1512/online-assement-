
import {createContext,useState} from 'react'
export const DataContext=createContext(null);

const DataProvider=({children})=>{

const [selectedOption,setSelectedOption]=useState("");

return( 
    <div>
    <DataContext.Provider value={{
       selectedOption,setSelectedOption
    }}>
  
         {children}
    </DataContext.Provider>
    </div>
)

}

export default DataProvider;
