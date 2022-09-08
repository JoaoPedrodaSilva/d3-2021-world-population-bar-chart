export const AxisBottom = ({ xScale, innerHeight, tickFormat }) => (
    xScale.ticks().map((tick, index) => ( //used .ticks() because xScale is scaleLinear
        <g key={index} transform={`translate(${xScale(tick)}, 0)`}>
            <line
                style={{ stroke: "#c0c0bb" }}
                y2={innerHeight}
            />
            <text
                style={{ textAnchor: "middle", fill: "#635f5d" }}
                y={innerHeight}
                dy="1rem"
            >
                {tickFormat(tick)}
            </text>
        </g>
    ))
)
