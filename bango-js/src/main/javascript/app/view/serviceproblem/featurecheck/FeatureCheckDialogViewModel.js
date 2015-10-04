Ext.define('Spm.view.serviceproblem.featurecheck.FeatureCheckDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.featureCheckDialog',

    stores: {
        featureCheckResults: {
            autoLoad: false,
            pageSize: 0,
            proxy: 'featureCheckProxy'
        }
    },

    data: {
        cancelButtonHidden: true,
        acceptButtonDefaultDisabled: false
    },

    serviceProblemId: function () {
        return this.get('serviceProblem.serviceProblemId');
    }

});
