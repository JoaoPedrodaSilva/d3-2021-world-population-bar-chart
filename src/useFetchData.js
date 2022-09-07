import { useEffect } from "react";
import { csv } from "d3"
import { useDataContext } from "./dataContext";

export const useFetchData = () => {
    const { setData } = useDataContext()

    useEffect(() => {
        let preliminaryData = []
        csv("https://gist.githubusercontent.com/JoaoPedrodaSilva/beeec3f2b578f87ccb803e7f5420ea74/raw/7e6a1dc899fe17c1809493c1a6b57085eb6deb6d/2021-UN-Population.csv")
            .then(response => {
                response.map(row => (
                    preliminaryData.push(
                        {
                            country: row.Country,
                            population: Number(row["Population (thousands)"]) * 1000
                        })
                ))
                setData(preliminaryData.slice(0, 10))
            })
    }, [setData])
} 