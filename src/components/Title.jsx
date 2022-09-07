import React from 'react'

export const Title = ({width, margin}) => {
  return (
      <text
          className="title"
          x={width / 3.5}
          y={-margin.top / 3}
          textAnchor="middle"
      >2021 World Population</text>
  )
}
