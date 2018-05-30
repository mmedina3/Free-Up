import React from 'react';

class Search extends React.Component {
    render(){
        return(
            <form id="search_term" onSubmit={this.props.getSearch}>
                <input type="text" name="city" placeholder="City..."/>
                <button>Search</button>
            </form>
        );
    }
  }

export default Search;