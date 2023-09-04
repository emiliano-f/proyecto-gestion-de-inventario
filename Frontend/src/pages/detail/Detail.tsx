import { ReadItem,GetUrlParts } from "../../Api/apiService";
import { useState } from "react";
import "./detail.scss"

const Detail = () => {
    const [row, setRow] = useState(null);
    const {item:itemName} = GetUrlParts();
    ReadItem(setRow,itemName);

    return (
      <div className="single">
            <div className="view">
                <div className="info">

                <div className="topInfo">
                        <h1>{itemName}</h1>
                        <button>Update</button> 
                    </div>
                    
                    <div className="details">
                        {Object.keys(row).map((key,index) => (
                        <div className="item" key={index}>
                            <span className="itemTitle">{key}</span>
                            <span className="itemValue">{row[key]}</span>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
      </div>
    )
}

export default Detail
