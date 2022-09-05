import { useState, useEffect } from "react";
import { csv, scaleBand, scaleLinear, max } from "d3"

export const App = () => {
    //states
    const [data, setData] = useState(null)
    const [width, setWidth] = useState(null)
    const [height, setHeight] = useState(null)
    const [margin, setMargin] = useState(null)


    //for responsivity
    useEffect(() => {
        handleResize()
    }, [])

    const handleResize = () => {
        setTimeout(() => setWidth(window.innerWidth * 0.8), 5)
        setTimeout(() => setHeight(window.innerHeight * 0.8), 5)
        setTimeout(() => setMargin({
            top: window.innerHeight * 0.05,
            right: window.innerWidth * 0.05,
            bottom: window.innerHeight * 0.05,
            left: window.innerWidth * 0.18
        }), 5)
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


    //render in case of no data
    if (!data) {
        return <pre>Loading...</pre>
    }


    //scales
    const yScale = scaleBand()
        .domain(data.map(d => d.country))
        .range([0, height - margin.top - margin.bottom])

    const xScale = scaleLinear()
        .domain([0, max(data, d => d.population)])
        .range([0, width - margin.right - margin.left])


    //render bar chart
    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>

                {/* tick marks and labels  */}
                {xScale.ticks().map((tick, index) => ( //used .ticks() because xScale is scaleLinear
                    <g key={index} transform={`translate(${xScale(tick)}, 0)`}>
                        <line
                            y2={height - margin.top - margin.bottom}
                            stroke="gray"
                        />
                        <text
                            className="labels"
                            y={height - margin.top - margin.bottom}
                            style={{ textAnchor: "middle" }}
                            dy="1.2em"
                        >
                            {tick}
                        </text>
                    </g>
                ))}

                {yScale.domain().map((tick, index) => ( //used .domain() because yScale is scaleBand
                    <g key={index} transform={`translate(0, ${yScale(tick)})`}>
                        <text
                            className="labels"
                            style={{ textAnchor: "end" }} 
                            dx="-0.3em"
                            dy="2.2em"
                        > {/* gotta make the label aligned to the center of the bar */}
                            {tick} {/* gotta make every line in a row, for better reponsivity */}
                        </text>
                    </g>
                ))}

                {/* bars */}
                {data.map((d, i) => (
                    <rect
                        key={i}
                        x={0}
                        y={yScale(d.country)}
                        width={xScale(d.population)}
                        height={yScale.bandwidth()}
                    />
                ))}
            </g>
        </svg>
    );
}