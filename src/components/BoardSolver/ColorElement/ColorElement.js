import React, { useState } from 'react'

export default function ColorElement(props) {
    const [activeColor, setActiveColor] = useState("white");
    const [clearVal, setClearVal] = useState(0);

    if (props.solutionColor !== "undef" && activeColor !== props.solutionColor) {
        setActiveColor(props.solutionColor);
    }

    if (clearVal != props.mainClear) {
        setClearVal(props.mainClear);
        setActiveColor("white");
    }

    let freqOfColor = props.freqOfColor;
    let coord = props.coord;

    let style = {
        backgroundColor: activeColor,
        border: "1px solid black"
    };

    return (
        props.valid && 
        <div onClick={() => {
            if (activeColor === "white" && freqOfColor.get(props.color) < 2) {
                setActiveColor(props.color);
                freqOfColor.set(props.color, freqOfColor.get(props.color)+1);
                coord.get(props.color).push(props.id);

                props.setFreqOfColor(freqOfColor);
                props.setCoord(coord)
            } else if (activeColor !== "white" && props.color === activeColor) {
                setActiveColor("white");
                freqOfColor.set(props.color, freqOfColor.get(props.color)-1);
                let ind = coord.get(props.color).indexOf(props.id);
                if (ind !== -1) {
                    coord.get(props.color).splice(ind, 1);
                }

                props.setFreqOfColor(freqOfColor);
                props.setCoord(coord)
            }
        }} style={style}>
            
        </div>
    )
}
