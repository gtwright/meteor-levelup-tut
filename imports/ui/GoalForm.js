import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const createGoalQuery = gql`
  mutation createGoal($name: String!, $resolutionId: String!) {
    createGoal(name: $name, resolutionId: $resolutionId) {
      _id
    }
  }
`;

class GoalForm extends Component {
  submitForm = () => {
    //don't fire for empty field
    if (this.name.value){
      this.props.createGoal({variables:{
        name: this.name.value,
        resolutionId: this.props.resolutionId
      }})
      .then(({data})=>{
          this.name.value = '';
      }).catch(error => {
        console.log(error);
      });
    }
  };

  render() {
    return (
      <span>
       <input type="text" ref={input => (this.name = input)}/>
       <button onClick={this.submitForm}>Submit</button>
      </span>
    )
  }
}

export default graphql(createGoalQuery,{
  name:"createGoal",
  options: {
    refetchQueries: ['Resolutions']
  }
})(GoalForm);
