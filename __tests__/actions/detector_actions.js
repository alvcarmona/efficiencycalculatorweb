import configureStore from 'redux-mock-store';

// Actions to be tested
import * as selectActions from '../../effcalculator/frontend/assets/js/modules/actions/index';

const mockStore = configureStore();
const store = mockStore();

describe('detector_actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  describe('action', () => {
    test('actions', () => {
      expect(1).toBe(1);
    });
  });

});