Ext.define('Spm.view.troublereport.TroubleReportsPanel', {
        extend: 'Ext.panel.Panel',
        alias: 'widget.troubleReportsPanel',

        reference: 'troubleReportsPanel',

        title: 'Trouble Reports',
        layout: {
            align: 'stretch',
            type: 'vbox'
        },
        frame: true,
        fieldDefaults: {
            disabled: true
        },

        items: [
            {
                xtype: 'container',
                layout: {
                    align: 'stretch',
                    type: 'hbox'
                },
                defaults: {
                    layout: 'form',
                    defaults: {
                        readOnly: true
                    }
                },
                items: [
                    {
                        xtype: 'fieldcontainer',
                        flex: 1,
                        items: [
                            {
                                xtype: 'gridpanel',
                                reference: 'troubleReportsGrid',
                                height: 100,
                                border: false,
                                bind: {
                                    store: {
                                        fields: ['operatorActionRef', 'providerRef', 'btRef', 'description', 'status'],
                                        data: [
                                            ['5', '23_FNC', '23_FNC', 'Pedr', 'Pending']
                                        ]
                                    }
                                },
                                columns: [
                                    {
                                        text: 'Operator Action Ref',
                                        dataIndex: 'operatorActionRef',
                                        width: 140,
                                        resizable: true
                                    },
                                    {
                                        text: 'Provider Ref',
                                        dataIndex: 'providerRef',
                                        width: 140,
                                        resizable: true
                                    },
                                    {
                                        text: 'BT Ref',
                                        dataIndex: 'btRef',
                                        width: 140,
                                        resizable: true
                                    },
                                    {
                                        text: 'Description',
                                        dataIndex: 'description',
                                        width: 300,
                                        resizable: true
                                    },
                                    {
                                        text: 'Status',
                                        dataIndex: 'status',
                                        width: 140,
                                        resizable: true
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }]
    }
);