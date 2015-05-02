'use strict';

import React from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import {IntlMixin} from 'react-intl';

export default React.createClass({
  displayName: 'Cars',
  mixins: [ListenerMixin, IntlMixin],
  contextTypes: {
    router: React.PropTypes.func
  },
  propTypes: {
    flux: React.PropTypes.object.isRequired
  },
  carsStore() {
    return this.props.flux.getStore('cars');
  },
  carsActions() {
    return this.props.flux.getActions('cars');
  },
  getInitialState() {
    return this.carsStore().getState();
  },
  componentWillMount() {
    // return this.props.flux.getActions('cars').fetch();
  },
  componentDidMount() {
    this.listenTo(this.carsStore(), this.handleStoreChange);
  },
  handleStoreChange() {
    this.setState(this.getInitialState());
  },
  addCar() {
    this.carsActions().add(this.state.newCarName);
    this.setState({newCarName: ''});
  },
  handleCarNameInput(event) {
    this.setState({newCarName: event.target.value});
  },
  render() {
    return (
      <div>
        <h1>Cars</h1>
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="New car name..."
            value={this.state.newCarName}
            onChange={this.handleCarNameInput}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="button" onClick={this.addCar}>Add</button>
          </span>
        </div>
        <br/>
        <ul> {this.state.cars.map((car, index) =>
          <li className='car' key={index}>{car}
          </li>)}
        </ul>
      </div>
    );
  }
});
