import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import Activity from '../components/Activity'

describe('testing the Start page component', () => {
    
    let component
    let activity = {}

    //burde teste buttonclicken.


    beforeAll(() => {
      component = render(<Activity activity={activity}/>)
    })
  /* 
    test('tests Start page', () => {
        expect(component.container.querySelector('.login'))
        .toHaveTextContent('Velkommen til GjørNo')
    })

    test('makes sure that the buttons are there', () => {
      const registerButton = component.container.querySelector('.registrerButton')
      const loginButton = component.container.querySelector('.loginButton')
      expect(registerButton).toBeDefined()
      expect(loginButton).toBeDefined()
    }) */
})
