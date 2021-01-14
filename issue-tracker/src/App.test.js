import React from "react";
import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from "./App";
import "mutationobserver-shim";
import { createMockClient } from 'mock-apollo-client';
import { ApolloProvider } from "@apollo/client";
import { ErrorContext } from './App';


test('loads and displays greeting', async () => {
      const mockClient = createMockClient();

      render(<ApolloProvider client={mockClient}>
            <ErrorContext.Provider value={{error:null, dispatch:()=>jest.fn()}}>
                <App/>
            </ErrorContext.Provider>
            </ApolloProvider>,)
  expect(screen.getByPlaceholderText('username')).toHaveTextContent('');
})