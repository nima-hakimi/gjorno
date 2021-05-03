import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import axios from "axios";
import TestingLibraryElementError from '@testing-library/jest-dom'
import { render, fireEvent, screen, act } from '@testing-library/react'

import Home from '../pages/Home'
import { execute } from 'graphql';

jest.mock('axios')

const Activites = [
    {
        id: 1,
        name: "Test activity",
        description: "Activity to be tested",
        creator: 1
    },
    {
        id: 2,
        name: "Testing of activity 2",
        description: "Activity to be tested, a second activity",
        creator: 2
    }
]

describe('testing the home page component', () => {
    
    let container = null;
    beforeEach(() => {
    // setup a DOM element as a render target
        container = document.createElement("div");
        document.body.appendChild(container);
    });


    it('on render, activities should be set', async () => {
        axios.get.mockResolvedValue({
            data: Activites
        })
        let component
        await act(async () => {
            component = render(<Home/>)
        })
        expect(component.getByText('Test activity')).toBeDefined()
        expect(component.getByText('Testing of activity 2')).toBeDefined()

    })

    it('on render, if no activities, then should be empty', async () => {
        axios.get.mockResolvedValue({
            data: []
        })
        let component
        await act(async () => {
            component = render(<Home/>)
        })
        expect(() => component.getByText('Test activity')).toThrow('Unable to find an element')
        expect(() => component.getByText('Testing of activity 2')).toThrow('Unable to find an element')
    })

})
