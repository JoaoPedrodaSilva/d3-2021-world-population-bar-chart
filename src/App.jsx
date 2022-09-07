import { useState, useEffect } from "react";
import { scaleBand, scaleLinear, max, format } from "d3"
import { useFetchData } from "./useFetchData";
import { useDataContext } from "./dataContext";
import { AxisBottom } from "./components/AxisBottom";
import { AxisLeft } from "./components/AxisLeft";
import { Marks } from "./components/Marks";
import { Title } from "./components/Title";
import { Source } from "./components/Source"


export const App = () => {
    //states and variables
    const { data } = useDataContext()
    const [width, setWidth] = useState(null)
    const [height, setHeight] = useState(null)
    const [margin, setMargin] = useState(null)
    const xAccessor = d => d.population
    const yAccessor = d => d.country
    const xAccessorTickFormat = tick => format(".2s")(tick).replace("G", "B")


    //for responsivity
    useEffect(() => {
        handleResize()
    }, [])

    const handleResize = () => {
        setTimeout(() => setWidth(window.innerWidth * 0.8), 5)
        setTimeout(() => setHeight(window.innerHeight * 0.8), 5)
        setTimeout(() => setMargin({
            top: window.innerHeight * 0.1,
            right: window.innerWidth * 0.05,
            bottom: window.innerHeight * 0.08,
            left: window.innerWidth * 0.2
        }), 5)
    }

    window.addEventListener('resize', handleResize)


    //fetch data
    useFetchData()


    //render in case of no data
    if (!data) {
        return <pre>Loading...</pre>
    }


    //scales
    const yScale = scaleBand()
        .domain(data.map(yAccessor))
        .range([0, height - margin.top - margin.bottom])
        .paddingInner(0.1)

    const xScale = scaleLinear()
        .domain([0, max(data, xAccessor)])
        .range([0, width - margin.right - margin.left])


    //render bar chart
    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <Title
                    width={width}
                    margin={margin}
                />

                <AxisBottom
                    xScale={xScale}
                    height={height}
                    margin={margin}
                    tickFormat={xAccessorTickFormat}
                />

                <AxisLeft
                    yScale={yScale}
                />

                <Marks
                    xScale={xScale}
                    yScale={yScale}
                    xAccessor={xAccessor}
                    yAccessor={yAccessor}
                    tooltipFormat={xAccessorTickFormat}
                />

                <Source
                    width={width}
                    height={height}
                    margin={margin}
                />
            </g>
        </svg>
    );
}