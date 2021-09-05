import React from "react"
import "./Example.css"

export default function Example (props) {
    return (
        <span className ="exampleItem">
            <div className="leftExample">
                {props.lText.split(" ").map(l => {
                    return props.translations && props.translations.includes(l.toLowerCase().replace(/[.,\s]/g, '')) 
                        ? <span style={{ color: 'green' }}>{l} </span>
                        : l + " "
                })}
            </div>
            <div className="rightExample">
                {props.rText.split(" ").map(l => {
                    return props.synonyms && props.synonyms.includes(l.toLowerCase().replace(/[.,\s]/g, '')) 
                        ? <span style={{ color: 'green' }}>{l} </span>
                        : l + " "
                })}
            </div>
        </span>
    )
}