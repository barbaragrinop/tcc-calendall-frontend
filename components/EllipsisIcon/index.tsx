import * as React from "react"
import Svg, { Path, Shape, SvgProps } from "react-native-svg"

export function EllipsisIcon(props: SvgProps) {
    return (
        (
            <Svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                {...props}
            >
                <Path
                    d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0zM5.5 11.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5S7 9.2 7 10s-.7 1.5-1.5 1.5zm4.5 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm4.5 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5S16 9.2 16 10s-.7 1.5-1.5 1.5z"
                    fill="#6497B2"
                />
            </Svg>
        )
    )
}
