import React, { useState, useContext } from 'react'

const DataContext = React.createContext()

const DataProvider = ({ children }) => {
    const [data, setData] = useState(null)

    return (
        <DataContext.Provider
            value={{
                data, setData
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export const useDataContext = () => useContext(DataContext)
export { DataContext, DataProvider }