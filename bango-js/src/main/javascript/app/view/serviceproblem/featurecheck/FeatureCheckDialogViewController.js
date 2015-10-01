Ext.define('Spm.view.serviceproblem.featurecheck.FeatureCheckDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.featureCheckDialog',

    onShow: function () {
        var me = this;
        var serviceProblemId = this.getViewModel().serviceProblemId();
        this.getStore('featureCheckResults').load({
            params: {serviceProblemId: serviceProblemId},
            callback: function (records) {
                if (records.length > 0) {
                    me.getView().getLayout().setActiveItem(me.lookupReference('featureCheckGrid'));
                }
            }
        });
    },

    onAccept: function () {
        this.closeView();
    }

});
