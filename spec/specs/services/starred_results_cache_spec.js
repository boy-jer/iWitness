describe("SavedResultsCache", function() {
  var cache, result, result2;

  beforeEach(function() {
    cache = SavedResultsCache;
    localStorage.clear();
    result = { get: function(){ return 1;}
       , serialize: function(){ return JSON.stringify({resultType: 'twitter'});}
    };
    result2 = { get: function(){ return 2;}
        , serialize: function(){ return JSON.stringify({resultType: 'twitter'});}
    };
  });

  afterEach(function() {
    localStorage.clear();
  });

  it("results added to the cache can be removed from the cache", function(){
    expect(localStorage.length).toBe(0);
    cache.add(result);
    expect(localStorage.length).toBe(1);
    cache.remove(result);
    expect(localStorage.length).toBe(0);
  });

  it("only things 'in the cache' can be iterated over", function(){
    someFn = jasmine.createSpy();
    localStorage['not_part_of_cache'] = {error: true};

    cache.forEach(someFn);
    expect(someFn).not.toHaveBeenCalled();

    cache.add(result);
    cache.forEach(someFn);
    expect(someFn).toHaveBeenCalled();
    expect(someFn.callCount).toBe(1);
  });

  it('forEach passes the rebuilt result to the callback', function(){
    var callback = jasmine.createSpy();

    spyOn(IWitness.resultFactory, 'create').andReturn(result);

    cache.add(result);
    cache.forEach(callback);

    expect(IWitness.resultFactory.create).toHaveBeenCalledWith('twitter', {resultType: 'twitter'})
    expect(callback).toHaveBeenCalledWith(result);
  });

  describe("clearAll", function() {
    it("clears saved results from localStorage", function() {
      cache.add(result);
      localStorage['not_part_of_cache'] = {error: true};
      expect(localStorage.length).toBe(2);

      cache.clearAll();
      expect(localStorage.length).toBe(1);
    });
  });
});
