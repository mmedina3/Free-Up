import React from "react";

class Form extends React.Component{

    handleSubmit = (e) => {
        e.preventDefault();
        const fullName = e.target.fullName.value;
        const email = e.target.email.value;
        const city = e.target.city.value;
        
        console.log(fullName, email, city);

        fetch('/userInfo', {
            method: 'POST',
            body: JSON.stringify({
                name: fullName,
                email: email,
                location: city
            }),
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res => console.log(res));
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="fullName" placeholder="Name..."/>
                <input type="text" name="email" placeholder="Email..."/>
                <input type="text" name="city" placeholder="City..."/>
                <button>Submit</button>
            </form>
        );
    }
};

export default Form;