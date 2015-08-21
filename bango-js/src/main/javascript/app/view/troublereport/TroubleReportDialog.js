Ext.define('Spm.view.troublereport.TroubleReportDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.troubleReportDialog',

    controller: 'troubleReportDialog',
    viewModel: 'troubleReportDialog',
    title: 'Create Trouble Report',

    defaultFocus: 'shortDescriptionField',

    modal: true,

    items: [
    ]

});