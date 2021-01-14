import React from "react";
import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Sidebar from "./Sidebar";
import "mutationobserver-shim";
import { createMockClient } from 'mock-apollo-client';
import { ApolloProvider } from "@apollo/client";
import { ErrorContext } from '../App';
import { BrowserRouter as Router} from "react-router-dom";

test('loads and displays greeting', async () => {
      const mockClient = createMockClient();
      const auth = {
                    id:"dsadasdaca",
                    profile:"abc.com",
                    role:"Developer",
                    username:"Pera"};
      const picture = "abc.com";
      const logOut = jest.fn();
      render(
            <Router>
              <ApolloProvider client={mockClient}>
                <ErrorContext.Provider value={{error:null, dispatch:()=>jest.fn()}}>
                    <Sidebar auth={auth} picture={picture} logOut={logOut}/>
                </ErrorContext.Provider>
              </ApolloProvider>
            </Router>,)
  expect(screen.getByText('Settings')).toHaveTextContent('Settings');
})