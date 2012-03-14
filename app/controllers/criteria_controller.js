IWitness.criteriaController = Ember.Object.create({
  contentBinding: 'IWitness.criteria',

  initiateSearch: function() {
    IWitness.resultSetController.clearResults();
    IWitness.searchController.reset();
    Analytics.startSession( this.getPath('content.stream') );

    this.changeUrl();
  },

  changeUrl: _.debounce( function() {
    Ember.run.sync();

    if (this.getPath('content.isValid')) {
      IWitness.resultSetController.resume();

      if (this.getPath('content.stream')) {
        IWitness.routes.visitStream(this.get('content'));
      } else {
        IWitness.routes.visitSearch(this.get('content'));
      }
    }
  }, IWitness.config.searchDelay)

});
