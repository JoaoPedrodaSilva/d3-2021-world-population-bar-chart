import React from 'react'

export const AxisLeft = ({ yScale }) => (

    yScale.domain().map((tick, index) => ( //used .domain() because yScale is scaleBand

        <g className='tick' key={index} transform={`translate(0, ${yScale(tick)})`}>
            <text
                style={{ textAnchor: "end" }}
                dx="-0.3rem"
                dy="1.8rem"
            > {/* gotta make the label aligned to the center of the bar */}
                {tick} {/* gotta make every line in a row, for better responsivity */}
            </text>
        </g>
    ))
)
