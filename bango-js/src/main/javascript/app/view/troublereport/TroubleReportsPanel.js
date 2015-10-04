Ext.define('Spm.view.troublereport.TroubleReportsPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.troubleReportsPanel',

    requires: [
        'Ext.container.Container',
        'Ext.form.FieldContainer',
        'Ext.grid.Panel',
        'Ext.layout.container.Form',
        'Ext.layout.container.HBox'
    ],

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
                                store: '{troubleReports}'
                            },
                            listeners: {
                                cellclick: 'onSelectTroubleReport'
                            },
                            columns: [
                                {
                                    text: 'Operator Action Ref',
                                    dataIndex: 'troubleReportId',
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
                                    dataIndex: 'shortDescription',
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
        }
    ]

});
