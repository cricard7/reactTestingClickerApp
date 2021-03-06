import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter()})

// ***************

//TEST SETUP

//JS doc comment example -JS doc installed globally
//run jsdoc src/App.test.js  to generate documention in the out folder for this file.

//https://github.com/jsdoc/jsdoc

/**
 *  Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
 */

 //setup function so we dont need to call shallow on the component in every test
 const setup = (props={}, state=null) => {
   const wrapper = shallow(<App {...props} />)
   if(state) wrapper.setState(state);
  return wrapper
 }

/**
 * Return ShallowWrapper containing node(s) with the given data-test value. (called wrapper.find with given attribute)
 * @function findByTestAttr
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */

 //setup function to find data-test attributes
const findByTestAttr = (wrapper, val) =>{
  return wrapper.find(`[data-test="${val}"]`)
}





//good basic test for any component
it('renders without an error', () =>{
  //shallow takes JSX (or a component) 
  //const wrapper = shallow(<App/>)
  const wrapper = setup()
  //with just the above test it will pass even if just a blank component renders

  //we add an element to the component to identify it. 
  //example below is testing for the presence of an attribute to make sure the correct 
  //component rendered
  //we create called data-test with the value of the component name
  //cabab case is used as attributes are not case sensitive

  //convention used in this course is to prefex the data-test attribute with the word 'component'
  
  //const appComponent = wrapper.find("[data-test='component-app']")
  const appComponent = findByTestAttr(wrapper,'component-app')

//NOTE ON REMOVING OUR TEST PROPERTIES FROM PRODUCTION
// npm install--save-dev babel-plugin-react-remove-properties
// eject: npm run eject  (only for react-create-app - makes configs editable. This is irreversible)
// config babel to remove data-test attributes (see video if needed https://www.udemy.com/course/react-testing-with-jest-and-enzyme/learn/lecture/16175901#overview)

  //expecting to find one element with the above data-test
  expect(appComponent.length).toBe(1)

})

it('renders an increment button', () =>{
  //const wrapper = shallow(<App/>)
  const wrapper = setup()
  //const button = wrapper.find("[data-test='increment-button']")
  const button = findByTestAttr(wrapper,'increment-button')
  expect(button.length).toBe(1)

})

it('renders counter display', () => {

  //const wrapper = shallow(<App/>)
  const wrapper = setup()
  //const counter = wrapper.find("[data-test='counter-display']")
  const counter = findByTestAttr(wrapper,'counter-display')
  expect(counter.length).toBe(1)

})



it('counter starts at 0', ()=>{
  //TESTING STATE with setState and state
  //set the state then check its state acutally updated
  
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0)

})

it('clicking the increment button increases the counter display', ()=>{
  //create a wrapper with initial state counter: 7
  const counter = 7;
  const wrapper = setup(null, { counter })

  //find button and click
  const button = findByTestAttr(wrapper, 'increment-button')
    //https://airbnb.io/enzyme/docs/api/ShallowWrapper/simulate.html#returns
  button.simulate('click');

  //find display and test value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.text()).toContain(counter + 1)



})

