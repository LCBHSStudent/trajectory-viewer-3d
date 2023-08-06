// Copyright (c) 2023 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import {createAction, handleActions} from 'redux-actions';
import {combineReducers} from 'redux'
import keplerGlReducer from '@kepler.gl/reducers';

// CONSTANTS
export const INIT = 'INIT';
export const FETCH_BASEDATA = 'FETCH_BASEDATA';

// ACTIONS
export const appInit = createAction(INIT);
export const fetchBasedata = createAction(FETCH_BASEDATA);

// INITIAL_STATE
const initialAppState = {
  appName: 'trajectory viewer',
  loaded: false,
  showBasedata: false,
};

// REDUCER
const appReducer = handleActions(
  {
    [INIT]: (state, action) => ({
      ...state,
      loaded: true
    }),
    [FETCH_BASEDATA]: (state, action) => {
      console.log(action, action.payload);
      return ({
        ...state,
        showBasedata: true
      })
    }
  },
  initialAppState
);

const initReducer = combineReducers({
  // mount keplerGl reducer
  keplerGl: keplerGlReducer.initialState({
    // In order to provide single file export functionality
    // we are going to set the mapbox access token to be used
    // in the exported file
    uiState: {
      // hide side panel when mounted
      activeSidePanel: null,
      // hide all modals whtn mounted
      currentModal: null
    },
    visState: {
      loaders: [], // Add additional loaders.gl loaders here
      loadOptions: {} // Add additional loaders.gl loader options here
    },
    mapState: {
      maxPitch: 87.5,
    }
  }),
  app: appReducer
});

const composedUpdaters = {
  ['NULL_ACTION']: null,
};

// export initReducer to be combined in trajectory viewer
const composedReducer = (state, action) => {
  if (composedUpdaters[action.type]) {
    return composedUpdaters[action.type](state, action);
  }
  return initReducer(state, action);
};

export default composedReducer;
