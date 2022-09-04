import { useState, useEffect } from "react";
import { csv, scaleBand, scaleLinear, max } from "d3"

export const App = () => {
    //states
    const [data, setData] = useState(null)
    const [svgWidth, setSvgWidth] = useState(window.innerWidth * 0.7) //for responsivity
    const [svgHeight, setSvgHeight] = useState(window.innerHeight * 0.7) //for responsivity


    //for responsivity
    const handleResize = () => {
        setTimeout(() => setSvgWidth(window.innerWidth * 0.7), 10)
        setTimeout(() => setSvgHeight(window.innerHeight * 0.7), 10)
    }
    window.addEventListener('resize', handleResize)


    //fetch and treat data
    useEffect(() => {
        let preliminaryData = []
        csv("https://gist.githubusercontent.com/JoaoPedrodaSilva/beeec3f2b578f87ccb803e7f5420ea74/raw/7e6a1dc899fe17c1809493c1a6b57085eb6deb6d/2021-UN-Population.csv")
            .then(response => {
                response.map(row => (
                    preliminaryData.push(
                        {
                            country: row.Country,
                            population: Number(row["Population (thousands)"])
                        })
                ))
                setData(preliminaryData.slice(0, 10))
            })
    }, [])


    //render no data
    if (!data) {
        return <pre>Loading...</pre>
    }




    //scales
    const yScale = scaleBand()
        .domain(data.map(d => d.country))
        .range([0, svgHeight])

    const xScale = scaleLinear()
        .domain([0, max(data, d => d.population)])
        .range([0, svgWidth])


    //render bar chart
    return (
        <svg width={svgWidth} height={svgHeight}>
            {data.map((d, i) => (
                <rect
                    key={i}
                    x={0}
                    y={yScale(d.country)}
                    width={xScale(d.population)}
                    height={yScale.bandwidth()}
                />
            ))}
        </svg>
    );
}