import { useDataContext } from '../dataContext'

export const Marks = ({ xScale, yScale, xAccessor, yAccessor, tooltipFormat }) => {
    const { data } = useDataContext()

    return (
        data.map((d, i) => (
            <rect
                style={{ fill: "#137b80"}}
                key={i}
                x={0}
                y={yScale(yAccessor(d))}
                width={xScale(xAccessor(d))}
                height={yScale.bandwidth()}
            >
                <title>{tooltipFormat(xAccessor(d))}</title>
            </rect>
        ))
    )
}
