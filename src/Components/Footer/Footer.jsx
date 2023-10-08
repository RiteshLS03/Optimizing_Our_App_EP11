import React from "react";
import {AiOutlineHeart} from "react-icons/ai"
import "./Footer.css"

function Footer(){
    return(     
           <div className="footer">
           <h2>Made With {<AiOutlineHeart />}  by Ritesh</h2>
           </div>
    );
}

export default Footer;