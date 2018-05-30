import React from "react";

class City extends React.Component{
    render(){
        return(
            <div id="search_term" >
            {
                this.props.city && <p> Location:
                <span> {this.props.city}</span>
                </p>
            }
            {
                this.props.error && <p> {this.props.error}</p>
            }
            </div>
        );
    }
};

export default City;