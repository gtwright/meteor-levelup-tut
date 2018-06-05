import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const toggleGoal = gql`
  mutation toggleGoal($_id: String!)
    {toggleGoal(_id:$_id){
      name
      completed
    }
  }
`;

class Goal extends Component {
  toggleGoal = () => {
    console.log("Toggled!")
    this.props.toggleGoal({variables:{
      _id: this.props.goal._id
    }})
    .catch((error)=>(
      console.log(error)
    ))
  }
  render() {
    return (
      <li key={this.props.goal._id}>
        { this.props.user._id && (
          <input type="checkbox" checked={this.props.goal.completed} onChange={this.toggleGoal}/>
        )}
        {this.props.goal.name}
      </li>
    )
  }
}

export default graphql(toggleGoal,{
  name: "toggleGoal",
  options: {
    "refetchQueries":["Resolutions"]
  }
})(Goal)
