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

  mockClient.setRequestHandler(LOGIN, mutationHandler);

  it('should call the login mutation with the data from the form', async () => {
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

      fireEvent.change(await getByPlaceholderText('username'), {
        target: {
          value: username,
        },
      });

      fireEvent.change(await getByPlaceholderText('password'), {
        target: {
          value: password,
        },
      });

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