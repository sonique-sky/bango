Ext.define('Spm.view.troublereport.TroubleReportDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.troubleReportDialog',

    data: {
        troubleReportTemplate: null
    },

    formulas: {
        isRoiFttc: {
            bind: {
                bindTo: '{troubleReportTemplate}',
                deep: true
            },
            get: function(troubleReportTemplate) {
                return 'RoiFttc' === troubleReportTemplate.get('serviceType');
            }
        }
    }
});