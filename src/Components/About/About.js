import "./About.css"
import ProfileClass from "../ProfileClass";
import Profile from "../profile";


const About = () => {
    return(
        <>
        <h1>About US</h1>
        <Profile name={"Ritesh"}/>
        <ProfileClass name={"Ritesh2"}/>
        {/* push */}
        </>
    )
}

export default About;

// import React from "react";
// import ProfileClass from "../ProfileClass"

// class About extends React.Component {
//   constructor(props) {
//     super(props);

//     // console.log("Parent constructor");
//   }


//   render() {
//     // console.log("Parent render");
//     return (
//       <div>
//        <ProfileClass name={"First Child"}/>
//        <ProfileClass name={"Second Child"}/>
//       </div>
//     );
//   }
// }

// export default About;
