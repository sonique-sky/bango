Ext.define('Spm.view.component.dialog.StandardDialogViewModel', {
    alternateClassName: 'Spm.component.StandardDialogViewModel',
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.standardDialog',

    data: {
        acceptButtonText: 'OK',
        cancelButtonText: 'Cancel',
        acceptButtonDefaultDisabled: true
    },

    acceptEnabled: function(){
        return !this.get('acceptButtonDefaultDisabled')
    }
});