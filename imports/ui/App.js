import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { withApollo } from 'react-apollo';

import ResolutionForm from './ResolutionForm';
import GoalForm from './GoalForm';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import Goal from './resolutions/Goal';

const App = ({loading, resolutions, client, user }) => {
  if (loading) return <h1>Loading...</h1>;
  return (
  <div>
    { user._id ? (
        <div>
          <button onClick={() => {
            Meteor.logout();
            client.resetStore();
          }}>Log out</button>
          <ResolutionForm />
        </div>
      ) : (
        <div>
          <RegisterForm client={client} />
          <LoginForm client={client} />
        </div>
      )
    }

    <ul>
      {resolutions.map(resolution=>(
        <li key={resolution._id}>
          {resolution.name} {resolution.completed && <span>DONE</span>}<GoalForm resolutionId={resolution._id}/>
          <ul>
            {resolution.goals.map(goal=>(
              <Goal goal={goal} key={goal._id} user={user}/>
            ))}

          </ul>
        </li>
      ))}
    </ul>
  </div>
)
}

const resolutionsQuery = gql`
query Resolutions {
  resolutions{
    _id
    name
    completed
    goals{
      _id
      name
      completed
    }
  }
  user {
      _id
    }
}
`;

export default graphql(resolutionsQuery, {
  props: ({data})=>({ ...data })
})(withApollo(App));
