Ext.define('Spm.view.serviceproblem.featurecheck.FeatureCheckDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.featureCheckDialog',

    onShow: function () {
        var serviceProblemId = this.getViewModel().serviceProblemId();
        this.getStore('featureCheckResults').load({
            params: {serviceProblemId: serviceProblemId}
        });
    }

});
