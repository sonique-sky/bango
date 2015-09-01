Ext.define('Spm.view.troublereport.TroubleReportDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.troubleReportDialog',

    onShow: function (troubleReport) {
        var serviceType = this.getViewModel().get('troubleReportTemplate.serviceType');
        this.getViewModel().getStore('testProducts').load({
            params: {
                serviceType: serviceType.code
            }
        });
    }

});