import React from 'react'

export const AxisBottom = ({ xScale, height, margin, tickFormat }) => (
    xScale.ticks().map((tick, index) => ( //used .ticks() because xScale is scaleLinear
        <g className='tick' key={index} transform={`translate(${xScale(tick)}, 0)`}>
            <line y2={height - margin.top - margin.bottom} />
            <text
                y={height - margin.top - margin.bottom}
                style={{ textAnchor: "middle" }}
                dy="1rem"
            >
                {tickFormat(tick)}
            </text>
        </g>
    ))
)
