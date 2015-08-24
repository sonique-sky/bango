Ext.define('Spm.view.troublereport.TroubleReportDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.troubleReportDialog',


    onBeforeShow: function () {
        var viewModel = this.getViewModel();

        var troubleReportTemplate = Ext.create('Spm.model.TroubleReportTemplate');

        troubleReportTemplate.load({
            params: {serviceProblemId: this.getViewModel().get('serviceProblemId')},
            success: function () {
                viewModel.set('troubleReportTemplate', this);
            }
        });
    }
});