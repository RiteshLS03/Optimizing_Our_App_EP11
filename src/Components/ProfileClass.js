import React from "react";

class ProfileClass extends React.Component {
  constructor(props) {
    super(props);
    // to create state and it's intial value
    this.state = {
      userInfo: {
        name: "Dummy Name",
        location: "Dummy Location",
      },
    };
    console.log("constructor" + this.props.name);
  }

  // componentDidMount will be called on initial/first render
  async componentDidMount() {
    // API Calls
    const userInfo = await fetch("https://api.github.com/users/RiteshLS03");
    const json = await userInfo.json();
    console.log(json);
    this.setState({
      userInfo: json,
    });
    console.log("Child componentDidMount" + this.props.name);
  }

  // componentDidUpdate after every next render
  componentDidUpdate() {
    console.log("componentDidUpdate");
    // Best place to make an API call and
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
  render() {
    console.log("render" + this.props.name);
    const { name, location, avatar_url } = this?.state?.userInfo;
    return (
      <div>
        <h1>Hey , I am class-based component</h1>
        <h2>Name:{name}</h2>
        <h3>Location:{location}</h3>
        <img src={avatar_url}></img>
      </div>
    );
  }
}

export default ProfileClass;

/**
 *
 *   First Child Constructor 
 *   First Child Render
 *
 * API Call
 * setStateff
 * DOM is updated
 * json is logged in console
 * child componentDidMount
 *
 * Parent component
 *
 */
