import React from "react";
import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ManageUsers from "./ManageUsers";
import "mutationobserver-shim";
import { createMockClient } from 'mock-apollo-client';
import { ApolloProvider } from "@apollo/client";
import { ErrorContext } from '../App';
import { BrowserRouter as Router} from "react-router-dom";

test('loads and displays greeting', async () => {
      const mockClient = createMockClient();
      const user_projects=[{
        id:"43242fsfsd",
        name:'Who',
        url:'oooopppp',
        isActive:true},
        {id:"dasdas44",
        name:'See',
        url:'ffffoooo',
        isActive:true}];
      const users=[
          {username:"bla",
           email:'truc@moo.com',
           role:'Contractor'}, 
          {username:"how",
           email:'hom@moo.com',
           role:'Developer'}, 
          {username:"pre",
           email:'see@moo.com',
           role:'Developer'}];
      render(
            <Router>
              <ApolloProvider client={mockClient}>
                <ErrorContext.Provider value={{error:null, dispatch:()=>jest.fn()}}>
                    <ManageUsers user_projects={user_projects} users={users}/>
                </ErrorContext.Provider>
              </ApolloProvider>
            </Router>,)
  expect(screen.getByText('Assign users to your project')).toBeInTheDocument('Assign users to your project');
})