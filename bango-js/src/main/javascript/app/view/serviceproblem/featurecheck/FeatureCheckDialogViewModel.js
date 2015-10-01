Ext.define('Spm.view.serviceproblem.featurecheck.FeatureCheckDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.featureCheckDialog',

    stores: {
        featureCheckResults: {
            //fields: ['id', 'description', 'startDate'],
            autoLoad: false,
            pageSize: 0,
            proxy: 'featureCheckProxy'
        }
    },

    serviceProblemId: function () {
        return this.get('serviceProblem.serviceProblemId');
    }
});