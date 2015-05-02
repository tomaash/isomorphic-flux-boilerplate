'use strict';

class CarsStore {

  constructor() {
    this.bindActions(this.alt.getActions('cars'));
    this.cars = ['kukabus'];
  }

  onAdd(name) {
    this.cars.push(name);
  }

}

export default CarsStore;
