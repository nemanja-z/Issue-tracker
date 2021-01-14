import React from "react";
import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MyView from "./MyView";
import "mutationobserver-shim";
import { createMockClient } from 'mock-apollo-client';
import { ApolloProvider } from "@apollo/client";
import { ErrorContext } from '../App';
import { BrowserRouter as Router} from "react-router-dom";

test('loads and displays greeting', async () => {
      const mockClient = createMockClient();
      const history={};
      const projects=[{name:'Who'
        url:'',
        isActive:true}, {name:'See'
        url:'',
        isActive:true}]; 
      const username= "Vera";
      const users=[{username:"bla",
            email:'truc@moo.com'
            role:'Contractor'}, 
            {username:"how",
            email:'hom@moo.com'
            role:'Developer'}, 
            {username:"pre",
            email:'see@moo.com'
            role:'Developer'}]
      render(
            <Router>
              <ApolloProvider client={mockClient}>
                <ErrorContext.Provider value={{error:null, dispatch:()=>jest.fn()}}>
                    <MyView history={history} projects={projects} username={username} users={users}/>
                </ErrorContext.Provider>
              </ApolloProvider>
            </Router>,)
  expect(screen.getByText('Settings')).toHaveTextContent('Settings');
})