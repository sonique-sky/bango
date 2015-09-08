Ext.define('Spm.view.troublereport.details.TroubleReportDetailsTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.troubleReportDetailsTab',

    closable: false,

    items: [
        {xtype: 'troubleReportDetailsPanelTab'},
        {xtype: 'customerContactDetailsPanelTab'}
    ]
});
