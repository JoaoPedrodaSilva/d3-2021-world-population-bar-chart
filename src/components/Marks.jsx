import React from 'react'
import { useDataContext } from '../dataContext'

export const Marks = ({ xScale, yScale, xAccessor, yAccessor }) => {
    const {data} = useDataContext()

    return (
        data.map((d, i) => (
            <rect
                key={i}
                className="mark"
                x={0}
                y={yScale(yAccessor(d))}
                width={xScale(xAccessor(d))}
                height={yScale.bandwidth()}
            />
        ))
    )
}
