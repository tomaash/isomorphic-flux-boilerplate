'use strict';

import Alt from 'alt';
import AltResolver from './alt-resolver.js';

import RequestsActions from 'actions/requests';
import LocaleActions from 'actions/locale';
import UsersActions from 'actions/users';
import CarsActions from 'actions/cars';

import RequestsStore from 'stores/requests';
import LocaleStore from 'stores/locale';
import UsersStore from 'stores/users';
import CarsStore from 'stores/cars';

class Flux extends Alt {

  constructor(config = {}) {
    super(config);

    this._resolver = new AltResolver();

    // Register Actions
    this.addActions('requests', RequestsActions);
    this.addActions('locale', LocaleActions);
    this.addActions('users', UsersActions);
    this.addActions('cars', CarsActions);

    // Register Stores
    this.addStore('requests', RequestsStore);
    this.addStore('locale', LocaleStore);
    this.addStore('users', UsersStore);
    this.addStore('cars', CarsStore);
  }

  resolve(result) {
    this._resolver.resolve(result);
  }

  render(handler) {
    return this._resolver.render(handler, this);
  }
}

export default Flux;
