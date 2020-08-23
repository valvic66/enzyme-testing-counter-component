import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import App from './App';

const setupApp = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);

  if(state) {
    wrapper.setState(state);
  }

  return wrapper;
}

const findNodeByDataTestId = (wrapper, dataTestId) => {
  return wrapper.find(`[data-testid='${dataTestId}']`);
}

test('renders component counter without error', () => {
  const component = setupApp();
  const componentCounter = findNodeByDataTestId(component, 'component-counter');

  expect(componentCounter.length).toBe(1);
});

test('renders counter display', () => {
  const component = setupApp();
  const counterDisplay = findNodeByDataTestId(component, 'counter-display');

  expect(counterDisplay.length).toBe(1);
});

test('renders last action display without error', () => {
  const component = setupApp();
  const lastActionDisplay = findNodeByDataTestId(component, 'last-action-display');

  expect(lastActionDisplay.length).toBe(1);
});

test('counter display value starts at 0, state and node', () => {
  const COUNTER_DISPLAY_DEFAULT = 0;
  const component = setupApp();
  const counterDisplay = findNodeByDataTestId(component, 'counter-display');

  expect(component.state().counterValue).toBe(COUNTER_DISPLAY_DEFAULT);
  expect(counterDisplay.text()).toContain("0");
});

test('should hide message error on init when counter is 0',  () => {
  const component = setupApp();
  // for hidden node with flag so not visible to the DOM on init>
  const errorMsg1 = component.find(".msg-visible");
  expect(errorMsg1.length).toBe(0);
  // OR
  // for visible node in the DOM but class hidden enabled
  const errorMsg2 = component.find(".msg-hidden");
  const errorMsg2HasClassHidden = errorMsg2.hasClass("msg-hidden");
  expect(errorMsg2HasClassHidden).toBe(true);
});

describe('button increment', () => {
  test('renders increment button without error', () => {
    const component = setupApp();
    const buttonIncrement = findNodeByDataTestId(component, 'button-increment');
  
    expect(buttonIncrement.length).toBe(1);
  });

  test('should increment counter display on click increment button', () => {
    const counterValue = 5;
    const component = setupApp(null, { counterValue });
    const buttonIncrement = findNodeByDataTestId(component, 'button-increment');
    buttonIncrement.simulate('click');
    component.update();
    const counterDisplay = findNodeByDataTestId(component, 'counter-display');
    
    expect(component.state().counterValue).toBe(counterValue + 1);
    expect(counterDisplay.text()).toContain(counterValue + 1);
  });
});

describe('button decrement', () => {
  test('renders decrement button without error', () => {
    const component = setupApp();
    const buttonDecrement = findNodeByDataTestId(component, 'button-decrement');
  
    expect(buttonDecrement.length).toBe(1);
  });
  
  test('should decrement counter display on click decrement button', () => {
    const counterValue = 5;
    const component = setupApp(null, { counterValue });
    const buttonDecrement = findNodeByDataTestId(component, 'button-decrement');
    buttonDecrement.simulate('click');
    component.update();
    const counterDisplay = findNodeByDataTestId(component, 'counter-display');
    
    expect(component.state().counterValue).toBe(counterValue - 1);
    expect(counterDisplay.text()).toContain(counterValue - 1);
  });
});

describe('counter is 0 and decrement button is ckecked', () => {
  let component;
  let buttonDecrement;
  beforeEach(() => {
    component = setupApp();
    buttonDecrement = findNodeByDataTestId(component, 'button-decrement');
    buttonDecrement.simulate('click');
    component.update();
  });

  test('counter remains 0', () => {
    const counterDisplay = findNodeByDataTestId(component, 'counter-display');

    expect(component.state().counterValue).toBe(0);
    expect(counterDisplay.text()).toContain(0);
  });

  test('msg error is displayed',  () => {
    const errorMsgs = component.find(".msg-visible");
    expect(errorMsgs.length).toBe(2);
  });

  test('clicking increment button hides the error messages', () => {
    const buttonIncrement = findNodeByDataTestId(component, 'button-increment');
    buttonIncrement.simulate('click');
    component.update();

    const errorMsgs = component.find(".msg-visible");
    expect(errorMsgs.length).toBe(0);

    const errorMsg1 = component.find(".msg-hidden");
    const errorMsgHasHiddenClass = errorMsg1.hasClass("msg-hidden");

    expect(errorMsgHasHiddenClass).toBe(true);
  });
});
