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

import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {addDataToMap, wrapTo} from '@kepler.gl/actions';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

import {
  SidebarFactory,
  PanelHeaderFactory,
  PanelToggleFactory,
  CustomPanelsFactory,
  MapPopoverFactory,
  DatasetSectionFactory,
  injectComponents
} from '@kepler.gl/components';

import CustomPanelHeaderFactory from './components/panel-header';
import CustomSidebarFactory from './components/side-bar';
import CustomPanelToggleFactory from './components/panel-toggle';
import CustomSidePanelFactory from './components/custom-panel';
import CustomMapPopoverFactory from './components/custom-map-popover';
import CustomDatasectionFactory from './components/custom-dataset-section';


// Inject custom components
const KeplerGl = injectComponents([
  [SidebarFactory, CustomSidebarFactory],
  [PanelHeaderFactory, CustomPanelHeaderFactory],
  [PanelToggleFactory, CustomPanelToggleFactory],
  [CustomPanelsFactory, CustomSidePanelFactory],
  [MapPopoverFactory, CustomMapPopoverFactory],
  [DatasetSectionFactory, CustomDatasectionFactory]
]);

class App extends Component {
  componentDidMount() {
    // this.props.dispatch(wrapTo('map_container', addDataToMap({datasets: sampleData, config})));
  }

  getMapboxRef = (mapbox, _index) => {
    if (!mapbox) {
      return
    } else {
      const map = mapbox.getMap();
      map.setMaxPitch(87.5);
    }
  }

  render() {
    return (
      <div style={{position: 'absolute', width: '100%', height: '100%', background: 'rgb(9, 16, 26)'}}>
        <AutoSizer>
          {({height, width}) => (
            <KeplerGl mapboxApiAccessToken={MAPBOX_TOKEN} id="map_container" width={width} height={height} getMapboxRef={this.getMapboxRef} appName="trajector viewer" version="v0.1.0"/>
          )}
        </AutoSizer>
      </div>
    );
  }
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, dispatchToProps)(App);
