Ext.define('Spm.view.serviceproblem.transfer.TransferServiceProblemDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.transferServiceProblemDialog',

    viewModel: {type: 'transferServiceProblemDialog'},
    controller: 'transferServiceProblemDialog',

    title: 'Transfer Service Problem',
    iconCls: 'icon-transfer',

    height: 250,
    width: 450,

    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            listeners: {
                validitychange: 'onValidityChange'
            },
            reference: 'transferServiceProblemForm',
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Transfer Type',
                            displayField: 'transferType',
                            valueField: 'transferType',
                            bind: '{transferType}',
                            store: {
                                fields: ['transferType'],
                                data: [
                                    ['Hot Transfer'],
                                    ['Electronic Transfer']
                                ]
                            },
                            typeAhead: true,
                            forceSelection: true,
                            allowBlank: false,
                            emptyText: 'Please select a Transfer Type...'
                        },
                        {
                            xtype: 'gridpanel',
                            reference: 'queuesGrid',
                            height: 135,
                            border: false,
                            hideHeaders: true,
                            bind: {
                                store: '{queues}'
                            },
                            //listeners: {
                            //    cellclick: 'onSelectTroubleReport'
                            //},
                            columns: [
                                {
                                    text: 'Queue',
                                    dataIndex: 'name',
                                    flex: 1
                                }
                            ]
                        }
                    ]
                }
            ]
        }]
});
