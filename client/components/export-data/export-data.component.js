'use strict';

import ngFileSaver from 'angular-file-saver' 

class exportDataComponent {
  /*@ngInject*/
  constructor(FileSaver, Blob) {
    var vm = this;
    vm.FileSaver = FileSaver;
    vm.Blob = Blob;
  }

  exportData(type) {
    var vm = this;
    var api = vm.api || 'data';
    var data = JSON.stringify(vm.data, undefined, 2);
    if(!document.getElementById('exportable')){
      vm.Toast.show({type: 'error', data: 'Please create a div with  id="exportable" whose data is to be exported'})
      return;
    }
    var blob;
    if(type==='txt'){
    // Save as .txt
       blob = new Blob([data], {type: 'text/plain;charset=utf-8'});
      vm.FileSaver.saveAs(blob, api+'.txt');
    }else if(type==='csv'){
    // Save as .csv
      blob = new Blob([document.getElementById('exportable').innerHTML], {
        type: 'application/vnd.ms-excel;charset=charset=utf-8'});
      vm.FileSaver.saveAs(blob, api+".csv");
    }else if(type==='xls'){
    // Save as xls
      blob = new Blob([document.getElementById('exportable').innerHTML], {
        type: "application/vnd.ms-excel;charset=charset=utf-8"
      });
      vm.FileSaver.saveAs(blob, api+".xls");
    }else{
    // Save as .json
    blob = new Blob([data], {type: 'text/plain;charset=utf-8'});
    vm.FileSaver.saveAs(blob, api+'.json');
    }
  };

  openMenu($mdOpenMenu, ev) {
    var originatorEv;
    originatorEv = ev;
    $mdOpenMenu(ev);
  }
}

export default angular.module('materialCrudSqlApp.exportData', [ngFileSaver])
  .component('exportData', {
    template: `
    <md-menu md-position-mode="target-right target" ng-if="!$ctrl.no.export" ng-cloak id="exportable">
      <md-button aria-label="Open export menu" class="md-icon-button" ng-click="$ctrl.openMenu($mdOpenMenu, $event)">
        <ng-md-icon icon="inbox"></ng-md-icon>
      </md-button>
      <md-menu-content width="4">
        <md-menu-item>
          <md-button ng-click="$ctrl.exportData('json');" aria-label="Export {{$ctrl.api}} table in JSON format">
            <ng-md-icon icon="account_balance_wallet"></ng-md-icon>
            JSON
          </md-button>
        </md-menu-item>
        <md-menu-divider></md-menu-divider>
        <md-menu-item>
          <md-button ng-click="$ctrl.exportData('txt');" aria-label="Export {{$ctrl.api}} table in Text format">
            <ng-md-icon icon="text_format"></ng-md-icon>
            Text
          </md-button>
        </md-menu-item>
        <md-menu-divider></md-menu-divider>

      </md-menu-content>
    </md-menu>
    `,
    bindings: { 
      loading: '<',
      no: '<',
      data: '<',
      api: '<'
    },
    controller: exportDataComponent
})
.name;
