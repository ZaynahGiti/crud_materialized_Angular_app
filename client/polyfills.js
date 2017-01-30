// Polyfills
// (these modules are what are in 'angular2/bundles/angular2-polyfills' so don't use that here)



// Prefer CoreJS over the polyfills above
import 'core-js/es6';
import 'core-js/es7/reflect';
// require('zone.js/dist/zone');


if(!ENV) {
  var ENV = 'development';
}

if(ENV === 'production') {
  // Production
} else {
  // Development


  Error.stackTraceLimit = Infinity;


}
