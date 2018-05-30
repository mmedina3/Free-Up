import React from "react";

class Form extends React.Component{
    render(){
        return(
            <form onSubmit={this.props.getInfo}>
                <input type="text" name="name" placeholder="Name..."/>
                <input type="text" name="email" placeholder="Email..."/>
                <input type="text" name="city" placeholder="City..."/>
                <button>Submit</button>
            </form>
        );
    }
};

export default Form;