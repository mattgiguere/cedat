(function() {
  var app = angular.module('cedat', []);
  //CEDAT: Chiron Exploratory Data Analysis Tool

  app.controller('OvController', function(){
    //Get the current date:
    this.currentdate = new Date();

    this.datetime = this.currentdate.getFullYear() + '.'
               + (this.currentdate.getMonth()+1) + '.'
               + this.currentdate.getDate();
  });

  app.controller('TabController', function(){
    this.tab = 1;
    
    this.setTab = function(newTab){
      this.tab = newTab;
    };
  });

  this.isSet = function(qTab){
    return this.tab === qTab;
  };

})();

