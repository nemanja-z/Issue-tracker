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
      const projects=[{
        id:"43242fsfsd",
        name:'Who',
        url:'oooopppp',
        isActive:true,
        member:[{username:"bla",
           email:'truc@moo.com',
           role:'Contractor'}],
           manager:{username:"pla",
           email:'truc@moo.com',
           role:'Manager'}}, 
        {
        id:"dasdas44",
        name:'See',
        url:'ffffoooo',
        isActive:true,
        member:[{id:"42342fdsfsdfsd",
           username:"bla",
           email:'truc@moo.com',
           role:'Contractor'}],
           manager:{id:"asdas42342",
           username:"bla",
           email:'truc@moo.com',
           role:'Manager'}}]; 
      const username= "Vera";
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
                    <MyView history={history} projects={projects} username={username} users={users}/>
                </ErrorContext.Provider>
              </ApolloProvider>
            </Router>,)
  expect(screen.getByText('Project')).toBeInTheDocument('Project');
})