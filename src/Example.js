import React from "react"
import "./Example.css"

export default function Example (props) {
    return (
        <span className ="exampleItem">
            <div className="leftExample">
                {props.lText}
            </div>
            <div className="rightExample">
                {props.rText}
            </div>
        </span>
    )
}