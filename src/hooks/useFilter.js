import { useState } from "react"

export function useFilter(dataList, callback) {
    const [query, setQuery] = useState('')
    const filteredData =  dataList.filter((data) => {
        return callback(data).toLowerCase().includes(query);
    })
  
  
    return [filteredData, setQuery];

}
