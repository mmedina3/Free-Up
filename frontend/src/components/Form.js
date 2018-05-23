import React from "react";

class Form extends React.Component{
    render(){
        return(
            <form onSubmit={this.props.getCity}>
                <input type="text" name="city" placeholder="City..."/>
                <button>Search City</button>
            </form>
        );
    }
};

export default Form;