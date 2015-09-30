Ext.define('Spm.view.serviceproblem.msp.AssociateServiceProblemToMspDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.associateServiceProblemToMspDialog',

    requires: [
        'Ext.grid.Panel',
        'Spm.view.serviceproblem.msp.AssociateServiceProblemToMspDialogViewController',
        'Spm.view.serviceproblem.msp.AssociateServiceProblemToMspDialogViewModel'
    ],

    viewModel: {type: 'associateServiceProblemToMspDialog'},
    controller: 'associateServiceProblemToMspDialog',

    title: 'Associate MSP to Service Problem',
    iconCls: 'icon-associate-msp',

    height: 250,
    width: 450,
    bodyPadding: 10,

    items: [
        {
            xtype: 'gridpanel',
            rowLines: false,
            reference: 'mspGrid',
            height: 135,
            bind: {
                store: '{mspDashboardEntries}'
            },
            columns: [
                {
                    text: 'Id',
                    dataIndex: 'id',
                    flex: 1
                },
                {
                    text: 'Description',
                    dataIndex: 'description',
                    flex: 1
                },
                {
                    text: 'Start Date',
                    dataIndex: 'startDate',
                    flex: 1,
                    type: 'date',
                    dateFormat: 'timestamp'
                }
            ]
        }
    ]
});