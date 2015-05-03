'use strict';

import React from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import {IntlMixin} from 'react-intl';
import Formsy from 'formsy-react';
import MyOwnInput from 'components/shared/my-own-input';
import {clone} from 'lodash';

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
    return this.carsActions().fetch();
  },
  componentDidMount() {
    this.listenTo(this.carsStore(), this.handleStoreChange);
  },
  handleStoreChange() {
    this.setState(this.getInitialState());
  },
  submit(model) {
    this.carsActions().add(clone(model));
    this.refs.carForm.reset();
  },

  render() {
    return (
      <div>
        <h1>Cars</h1>
        <Formsy.Form ref="carForm" onSubmit={this.submit}>
          <MyOwnInput name="brand" title="Brand" type="text"/>
          <MyOwnInput name="model" title="Model" type="text"/>
          <MyOwnInput name="year" title="Year" type="text"/>
          <button className="btn btn-default" type="submit">Create</button>
        </Formsy.Form>
        <br/>
        <table className="table">
          <thead>
            <tr>
              <th>Brand</th>
              <th>Model</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {this.state.cars.map((car, index) =>
            <tr key={index}>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
});
