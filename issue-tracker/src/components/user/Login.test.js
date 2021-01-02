import { MockedProvider } from '@apollo/client/testing';
import React from "react";
import TestRenderer from "react-test-renderer";
import { ErrorContext } from '../../App';
import Login from './Login';


const mocks = []; 

/* const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <MockedProvider addTypename={false}>
    <ErrorContext.Provider {...providerProps}>{ui}</ErrorContext.Provider>
    </MockedProvider>,
    renderOptions
  )
} */
it('renders login form', () => {
  const component = TestRenderer.create(
    <MockedProvider addTypename={false}>
    <ErrorContext.Provider value={{error:null}}>
    <Login/>
    </ErrorContext.Provider>
    </MockedProvider>
  );
  const tree = component.root.findByType('label').children;
  expect(tree).toContain('Login');
});