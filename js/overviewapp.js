(function() {
  var app = angular.module('cedat', []);
  //CEDAT: Chiron Exploratory Data Analysis Tool

  app.controller('OvController', function(){
    //Get the current date:
    this.currentdate = minDate

    this.minDatetime = minDatetime;
    this.minDatetime = maxDatetime;
  });

  app.controller('TabController', function(){
    this.tab = 1;
    
    this.setTab = function(newTab){
      this.tab = newTab;
    };
  });

  app.controller('DateRangeController', function(){

    this.date = {};

    this.changeDates = function(date){
      minDatetime = this.minDate;
      maxDatetime = this.maxDate;
      ov.minDatetime.push(this.minDate);
      ov.maxDatetime.push(this.maxDate);
      this.date = {};
    };
  });

  this.isSet = function(qTab){
    return this.tab === qTab;
  };

var currentdate = new Date();
var minDate = new Date();
var maxDate = new Date();
var minDatetime = minDate.getFullYear() + '.'
             + (minDate.getMonth()+1) + '.'
             + minDate.getDate();

var maxDatetime = maxDate.getFullYear() + '.'
             + (maxDate.getMonth()+1) + '.'
             + maxDate.getDate();


})();

