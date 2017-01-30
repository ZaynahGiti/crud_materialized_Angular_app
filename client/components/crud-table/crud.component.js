'use strict';

import routes from './crud.routes';
import crudList from './list.component';
import factory from './../factory/factory.service';

class CrudComponent {
  /*@ngInject*/
  constructor($state) {
    this.$state = $state;
  }
  $onInit(){
    var vm = this;
    var obj = [];
    angular.forEach(vm.fields, function(i){
        var o = {};
        // Extract sortType from dataType
        if(i.dataType==='numeric' || i.dataType==='number' || i.dataType==='float' || i.dataType==='integer' || i.dataType==='currency') {
          i.dataType = 'parseFloat';
          o.sortType = 'parseFloat';
        }else if(i.dataType==='date' || i.dataType==='calendar'){
          i.dataType = 'date';
          o.sortType = 'date';
        }else if(i.dataType==='link' || i.dataType==='ref'  || i.dataType==='href' || i.dataType==='hyperlink'){
          i.dataType = 'link';
          o.sortType = 'lowercase';
        }else if(i.dataType==='array' || i.dataType==='multi'  || i.dataType==='multiple'){
          i.dataType = 'array';
          o.sortType = 'lowercase';
        }else if(i.dataType==='dropdown' || i.dataType==='select' || i.dataType==='option'){
          i.dataType = 'dropdown';
          o.sortType = 'lowercase';
        }else if(i.dataType==='textarea' || i.dataType==='multiline'){
          i.dataType = 'textarea';
          o.sortType = 'lowercase';
        }else if(i.dataType==='image' || i.dataType === 'photo' || i.dataType==='picture'){
          i.dataType = 'image';
          o.sortType = 'lowercase';
        }else{
          o.sortType = 'lowercase';
        }
        // check heading (Assign heading if not exists)
        if('heading' in i) {
          o.heading = i.heading;
        }else if('title' in i){
          o.heading = i.title;
        }else{
          o.heading = i.field;
        }

        // Assign fields to object
        o.field = i.field;
        o.noSort = i.noSort;
        o.noAdd = i.noAdd;
        o.noEdit = i.noEdit;
        o.dataType = i.dataType;
        o.options = i.options;
        o.link = i.link;
        obj.push(o);
      });
      if (localStorage !== null && JSON !== null && obj !== null && obj !== undefined && vm.fields) {
          localStorage.columns = JSON.stringify(obj);
      }
      if(!vm.path){
        vm.path = vm.api
      }
      localStorage !== null ? localStorage.columns : null;
      if (localStorage !== null && JSON !== null && vm.api !== null && vm.api !== undefined && vm.api) {
          localStorage.api = vm.api;
      }
      localStorage !== null ? localStorage.path : null;
      if (localStorage !== null && JSON !== null && vm.path !== null && vm.path !== undefined && vm.path) {
          localStorage.path = vm.path;
      }
  }
}

export default angular.module('mcrud.crud', [crudList, factory])
  .config(routes)
  .component('crudTable', {
    template: `
<navbar></navbar>
<md-content flex layout="column" class="content" md-no-flicker md-no-momentum>
<section layout="row">
    <div layout="column" flex>
      <crud-list api="$ctrl.api" fields="$ctrl.cols" sort="$ctrl.sort" no="$ctrl.no" path="$ctrl.path"></crud-list>
    </div>
    <md-content ng-show="$ctrl.$state.includes('crud.detail')"
      ui-view
      id="detail-content"
      layout="column"
      flex-xs="100"
      flex-sm = "90"
      flex-md="90"
      flex-lg="66"
      flex-gt-lg="66"
      class="md-whiteframe-z1"
      md-no-flicker md-no-momentum>
    </md-content>
</section>
</md-content>
`,
    controller: CrudComponent,
    bindings: { api: '@', fields: '<', path: '@', sort: '@', no: '<' }
  })
  .name