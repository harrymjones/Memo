import React from 'react';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import Toast from './Toast';

describe('Toast', () => {
  let props;
  let mountedToast;
  const toast = () => {
    if (!mountedToast) {
      mountedToast = mount(
        <Toast { ...props }/>
      );
    }
    return mountedToast;
  }

  beforeEach(() => {
    props = {
      type: undefined,
      text: undefined,
      duration: undefined,
    };
    mountedToast = undefined;
  });

  it('always renders a div', () => {
    const div = toast().find('div');
    expect(div.length).toBe(1);
  });

  describe('if duration is undefined', () => {
    it('sets show to `true` after 250ms', () => {
      jest.useFakeTimers();

      const t = toast();

      expect(t.state().show).toBe(false);

      setTimeout(() => {
        expect(t.state().show).toBe(true);
      }, 250);

      jest.runAllTimers();
    });
  });

  describe('if duration is defined', () => {
    beforeEach(() => {
      props.duration = 1000;
    });

    it('sets show to `true` after 250ms', () => {
      jest.useFakeTimers();

      const t = toast();

      expect(t.state().show).toBe(false);

      setTimeout(() => {
        expect(t.state().show).toBe(true);
      }, 250);

      jest.runAllTimers();
    });

    it('sets show to `false` after duration', () => {
      jest.useFakeTimers();

      const t = toast();

      setTimeout(() => {
        expect(t.state().show).toBe(true);

        setTimeout(() => {
          expect(t.state().show).toBe(false);
        }, props.duration);
      }, 250);

      jest.runAllTimers();
    });
  });

  describe('if text is undefined', () => {
    it('doesn\'t pass a child', () => {
      const div = toast().find('div').first();
      expect(div.props().children).toBe(undefined);
    })
  });

  describe('if text is defined', () => {
    beforeEach(() => {
      props.text = 'Toast test';
    });

    it('passes `text` as a child', () => {
      const div = toast().find('div').first();
      expect(div.props().children).toBe(props.text);
    })
  });

  describe('if type is undefined', () => {
    it('has a className of `toast `', () => {
      const div = toast().find('div').first();
      expect(div.props().className).toEqual('toast ');
    })
  });

  describe('if type is defined', () => {
    beforeEach(() => {
      props.type = 'notify';
    });

    it('has a className of `toast toast--${type}`', () => {
      const div = toast().find('div').first();
      expect(div.props().className).toEqual('toast toast--' + props.type);
    })
  });

})
