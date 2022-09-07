import React from 'react'

export const Source = ({width, height, margin}) => {
    return (
        <text
            className="source"
            x={width / 3.5}
            y={height - (margin.top * 1.15)}
            textAnchor="middle"
        >
            Source:
            <a href="https://population.un.org/wpp/Download/Standard/Population/" target="blank" rel="noopener noreferrer">
                https://population.un.org/wpp/Download/Standard/Population/
            </a>
        </text>
    )
}
