import React, { useState } from 'react'

export default function ColorElement(props) {
    const [activeColor, setActiveColor] = useState("white");

    let freqOfColor = props.freqOfColor;
    // console.log(freqOfColor)

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
                props.setFreqOfColor(freqOfColor);
            } else if (activeColor !== "white" && props.color === activeColor) {
                setActiveColor("white");
                freqOfColor.set(props.color, freqOfColor.get(props.color)-1);
                props.setFreqOfColor(freqOfColor);
            }
        }} style={style}>
            
        </div>
    )
}
