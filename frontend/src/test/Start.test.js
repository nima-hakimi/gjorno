import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'
import ReactRouterDom from "react-router-dom";

import Start from '../pages/Start'

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));


describe('testing the Start page component', () => {
    
    let component

    beforeAll(() => {
      component = render(<Start/>)
    })
  
    test('tests Start page', () => {
        expect(component.container.querySelector('.login'))
        .toHaveTextContent('Velkommen til GjørNo')
    })

    test('makes sure that the buttons are there', () => {
      const registerButton = component.container.querySelector('.registrerButton')
      const loginButton = component.container.querySelector('.loginButton')
      expect(registerButton).toBeDefined()
      expect(loginButton).toBeDefined()
    })

    test('clicks login button, should history push to login page', () => {

      const {getByText} = render(<Start/>)
      const button = getByText(/Logg inn/)
      fireEvent.click(button)
      expect(mockHistoryPush).toHaveBeenCalledWith('/login')
    })

    test('clicks on register button, should history push to register', () => {
      const {getByText} = render(<Start/>)
      const registerButton = getByText(/Registrer/)
      fireEvent.click(registerButton)
      expect(mockHistoryPush).toHaveBeenCalledWith("/register")
    })
})
