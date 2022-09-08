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
    const width = 960
    const height = 500
    const margin = { top: 50, right: 20, bottom: 50, left: 120 }
    const innerWidth = width - margin.right - margin.left
    const innerHeight = height - margin.top - margin.bottom

    const xAccessor = d => d.population
    const yAccessor = d => d.country

    const xAccessorTickFormat = tick => format(".2s")(tick).replace("G", "B")


    //fetch data
    useFetchData()


    //render in case of no data
    if (!data) {
        return <pre>Loading...</pre>
    }


    //scales
    const xScale = scaleLinear()
        .domain([0, max(data, xAccessor)])
        .range([0, innerWidth])

    const yScale = scaleBand()
        .domain(data.map(yAccessor))
        .range([0, innerHeight])
        .paddingInner(0.1)


    //render bar chart
    return (
        <div className="responsive-div">
            <svg
                preserveAspectRatio="xMinYMin meet"
                viewBox={`0 0 ${width} ${height}`}
            >
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <Title
                        width={width}
                    />

                    <AxisBottom
                        xScale={xScale}
                        innerHeight={innerHeight}
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
                        innerWidth={innerWidth}
                        innerHeight={innerHeight}
                    />
                </g>
            </svg>
        </div>
    );
}