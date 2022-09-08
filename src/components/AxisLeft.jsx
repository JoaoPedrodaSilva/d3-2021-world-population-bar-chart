export const AxisLeft = ({ yScale }) => (

    yScale.domain().map((tick, index) => ( //used .domain() because yScale is scaleBand

        <g key={index} transform={`translate(0, ${yScale(tick)})`}>
            <text
                style={{ textAnchor: "end", fill: "#635f5d" }}
                dx="-0.3rem"
                dy="1.5rem"
            > {/* gotta make the label aligned to the center of the bar */}
                {tick} {/* gotta make every line in a row, for better responsivity */}
            </text>
        </g>
    ))
)
