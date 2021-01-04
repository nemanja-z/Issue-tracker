import { ApolloProvider } from "@apollo/client";
import { act, fireEvent, render, wait } from "@testing-library/react";
import { createMockClient } from 'mock-apollo-client';
import "mutationobserver-shim";
import React from "react";
import { ErrorContext } from '../../App';
import { LOGIN } from "../../queries/user/queries";
import Login from './Login';


describe('login form', () => {
  const mockClient = createMockClient();

  const mutationHandler = jest.fn().mockResolvedValue({
    data: {
      userLogin: {
        token: 'adsadassca',
      },
    },
  });

  // Add the mocked mutation handler to the mock client
  mockClient.setRequestHandler(LOGIN, mutationHandler);

  it('should call the login mutation with the data from the form', async () => {
    // Setup the data that will go into your login form
    const username = 'test@example.com';
    const password = 'password';

    await act(async () => {
      const { getByPlaceholderText, getByRole } = render(
        <ApolloProvider client={mockClient}>
    <ErrorContext.Provider value={{error:null, dispatch:()=>jest.fn()}}>
      <Login/>
      </ErrorContext.Provider>
    </ApolloProvider>,
      );

      // Fill in the email field
      fireEvent.change(await getByPlaceholderText('username'), {
        target: {
          value: username,
        },
      });

      // Fill in the password field
      fireEvent.change(await getByPlaceholderText('password'), {
        target: {
          value: password,
        },
      });

      // Click the submit button
      await wait(async () =>
        fireEvent.click(await getByRole('button', { name: 'Login' })),
      );
    });

    expect(mutationHandler).toBeCalledWith({
        username,
        password,
      
    });
  })
});