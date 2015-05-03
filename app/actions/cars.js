'use strict';

class CarsActions {
  constructor() {
    this.generateActions(
      'add', 'fetchSuccess'
    );
  }

  fetch() {
    const promise = (done) => {
      console.log('will get cars');
      var carsCollection = this.alt.api.all('cars');
      carsCollection.getAll().then((response) => {
        var data = response().data;
        console.log(data[0]);
        this.actions.fetchSuccess(data);
        return done();
      }, (err) => {
        console.log(err);
        return done();
      }).catch((err) => {
        console.log(err);
        return done();
      });
    };
    this.alt.resolve(promise);
  }
}

export default CarsActions;
