export const Source = ({ innerWidth, innerHeight }) => {
    return (
        <text
            style={{ fill: "#635f5d", fontSize: "0.7rem" }}
            x={innerWidth}
            y={innerHeight + 45}
            textAnchor="end"
        >
            Source:
            <a
                style={{ fill: "#635f5d" }}
                href="https://population.un.org/wpp/Download/Standard/Population/"
                target="blank"
                rel="noopener noreferrer">
                https://population.un.org/wpp/Download/Standard/Population/
            </a>
        </text>
    )
}
