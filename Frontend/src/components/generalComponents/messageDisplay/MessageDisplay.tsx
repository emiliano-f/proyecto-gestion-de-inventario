import "./messageDisplay.scss"
import { FiAlertTriangle, FiAlertCircle } from "react-icons/fi"
import { MessageContext, getMessage } from "../../providerComponents/messageProvider/MessageProvider";
import { useContext } from "react";
import React from "react";

function MessageDisplay() {
    const msgObj = getMessage();
    return (
        <div id="msg" className={(msgObj.title === "") ? "hidden" : "visible"}>
            <div className={msgObj.is_error ? "alert alert-danger" : "alert alert-success"}>
                <div className="row">
                    <div className="col-1 icon">
                        {msgObj.is_error ? <FiAlertTriangle size={32} /> : <FiAlertCircle size={32} />}
                    </div>
                    <div className="col-10">
                        <span className="title">{msgObj.title}</span>
                        {msgObj.desc ? <span className="desc">{msgObj.desc}</span> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageDisplay;