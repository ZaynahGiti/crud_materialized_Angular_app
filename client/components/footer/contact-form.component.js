import Toast from '../toast/toast.service';

export class ContactFormCtrl {
  /*@ngInject*/
  constructor($mdDialog, $http, Toast) {
    this.$mdDialog = $mdDialog
    this.$http = $http
    this.Toast = Toast
  }
  hide() {
      this.$mdDialog.hide();
  }
  cancel() {
    this.$mdDialog.cancel();
  }
  send(mail) {
    this.$http.post('/api/sendmail', {
      from: 'CodeNx <admin@codenx.com>',
      to: 'support@codenx.com',
      subject: 'Message from Material CRUD',
      text: mail.message
    });
    this.$mdDialog.hide(mail);
    this.Toast.show({type:'success', text: 'Thanks for contacting us.'})
  }
}

export default angular.module('directives.footer', [Toast])
  .component('contactForm', {
    template: `
    <div layout="row">
      <md-content flex layout="column">
        <section layout="column" flex layout-align="center center">
          <h1>Write to us</h1>
          <form name="form" ng-submit="$ctrl.send(contact)" novalidate>
            <section class="section" layout="column">
              <md-input-container md-is-error="(form.message.$error.required || form.message.$error.message) && form.message.$dirty">
                <label>Message</label>
                <textarea name="contact" ng-model="contact.message" required md-autofocus></textarea>
                <div ng-messages="form.message.$error" ng-if="form.message.$dirty">
                  <div ng-message="required">Message required</div>
                </div>
              </md-input-container>
            </section>
            <div class="md-dialog-actions" layout="row">
              <submit-button loading="loading" form="form" icon="send" text="Send Message"></submit-button>
              <md-button class="btn btn-default btn-lg btn-register" ng-click="$ctrl.cancel()" aria-label="Cancel Send"> Cancel </md-button>
            </div>
          </form>
        </section>
      </md-content>
    </div>
    `,
    controller: ContactFormCtrl
  })
  .name;
