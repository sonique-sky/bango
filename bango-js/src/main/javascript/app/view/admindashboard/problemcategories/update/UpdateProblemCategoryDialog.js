Ext.define('Spm.view.admindashboard.problemcategories.update.UpdateProblemCategoryDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.updateProblemCategoryDialog',

    controller: 'updateProblemCategoryDialog',
    viewModel: {type: 'updateProblemCategoryDialog'},

    listeners: {
        activate: 'loadStore'
    },

    items: [{
        xtype: 'fieldcontainer',
        padding: 10,

        defaults: {
            listeners: {
                specialkey: 'submitOnEnter'
            }
        },

        width: 480,

        items: [
            {
                xtype: 'textfield',
                labelWidth: 150,
                itemId: 'problemCode',
                fieldLabel: 'Problem Code:',
                allowBlank: false,
                bind: {
                    value: '{problemCategory.problemCode}'
                }
            },
            {
                xtype: 'textfield',
                labelWidth: 150,
                itemId: 'description',
                fieldLabel: 'Description:',
                allowBlank: false,
                bind: {
                    value: '{problemCategory.description}'
                }
            },
            {
                xtype: 'checkbox',
                labelWidth: 250,
                fieldLabel: 'Force Auto Trouble Report:',
                name: 'forceAutoTroubleReport',
                bind: {
                    value: '{problemCategory.forceAutoTroubleReport}'
                }
            },
            {
                xtype: 'tabpanel',

                items: [
                    {
                        title: 'Default',
                        items: [
                            {
                                xtype: 'combobox',
                                labelWidth: 150,
                                fieldLabel: 'NVN Voice',
                                name: 'NvnVoice',
                                bind: {
                                    store: '{queues}'
                                },
                                valueField: 'name',
                                displayField: 'name',
                                typeAhead: true,
                                queryMode: 'local'
                            },
                            {
                                xtype: 'combobox',
                                labelWidth: 150,
                                fieldLabel: 'NVN Data',
                                name: 'NvnData',
                                bind: {
                                    store: '{queues}'
                                },
                                valueField: 'name',
                                displayField: 'name',
                                typeAhead: true,
                                queryMode: 'local'
                            },
                            {
                                xtype: 'combobox',
                                labelWidth: 150,
                                fieldLabel: 'Offnet Broadband',
                                name: 'OffnetBroadband',
                                bind: {
                                    store: '{queues}'
                                },
                                valueField: 'name',
                                displayField: 'name',
                                typeAhead: true,
                                queryMode: 'local'
                            },
                            {
                                xtype: 'combobox',
                                labelWidth: 150,
                                fieldLabel: 'Onnet Broadband',
                                name: 'OnnetBroadband',
                                bind: {
                                    store: '{queues}'
                                },
                                valueField: 'name',
                                displayField: 'name',
                                typeAhead: true,
                                queryMode: 'local'
                            },
                            {
                                xtype: 'combobox',
                                labelWidth: 150,
                                fieldLabel: 'WLR3',
                                name: 'WLR3',
                                bind: {
                                    store: '{queues}'
                                },
                                valueField: 'name',
                                displayField: 'name',
                                typeAhead: true,
                                queryMode: 'local'
                            },
                            {
                                xtype: 'combobox',
                                labelWidth: 150,
                                fieldLabel: 'FTTC',
                                name: 'FTTC',
                                bind: {
                                    store: '{queues}'
                                },
                                valueField: 'name',
                                displayField: 'name',
                                typeAhead: true,
                                queryMode: 'local'
                            },
                            {
                                xtype: 'combobox',
                                labelWidth: 150,
                                fieldLabel: 'Wifi Data',
                                name: 'WifiDataService',
                                bind: {
                                    store: '{queues}'
                                },
                                valueField: 'name',
                                displayField: 'name',
                                typeAhead: true,
                                queryMode: 'local'
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        title: 'Ethan',
                        items: [
                            {
                                xtype: 'combobox',
                                labelWidth: 150,
                                fieldLabel: 'NVN Voice',
                                name: 'NvnVoice',
                                bind: {
                                    store: '{queues}'
                                },
                                valueField: 'name',
                                displayField: 'name',
                                typeAhead: true,
                                queryMode: 'local'
                            },
                            {
                                xtype: 'combobox',
                                labelWidth: 150,
                                fieldLabel: 'NVN Data',
                                name: 'NvnData',
                                bind: {
                                    store: '{queues}'
                                },
                                valueField: 'name',
                                displayField: 'name',
                                typeAhead: true,
                                queryMode: 'local'
                            },
                            {
                                xtype: 'combobox',
                                labelWidth: 150,
                                fieldLabel: 'Offnet Broadband',
                                name: 'OffnetBroadband',
                                bind: {
                                    store: '{queues}'
                                },
                                valueField: 'name',
                                displayField: 'name',
                                typeAhead: true,
                                queryMode: 'local'
                            },
                            {
                                xtype: 'combobox',
                                labelWidth: 150,
                                fieldLabel: 'Onnet Broadband',
                                name: 'OnnetBroadband',
                                bind: {
                                    store: '{queues}'
                                },
                                valueField: 'name',
                                displayField: 'name',
                                typeAhead: true,
                                queryMode: 'local'
                            },
                            {
                                xtype: 'combobox',
                                labelWidth: 150,
                                fieldLabel: 'WLR3',
                                name: 'WLR3',
                                bind: {
                                    store: '{queues}'
                                },
                                valueField: 'name',
                                displayField: 'name',
                                typeAhead: true,
                                queryMode: 'local'
                            },
                            {
                                xtype: 'combobox',
                                labelWidth: 150,
                                fieldLabel: 'FTTC',
                                name: 'FTTC',
                                bind: {
                                    store: '{queues}'
                                },
                                valueField: 'name',
                                displayField: 'name',
                                typeAhead: true,
                                queryMode: 'local'
                            },
                            {
                                xtype: 'combobox',
                                labelWidth: 150,
                                fieldLabel: 'Wifi Data',
                                name: 'WifiDataService',
                                bind: {
                                    store: '{queues}'
                                },
                                valueField: 'name',
                                displayField: 'name',
                                typeAhead: true,
                                queryMode: 'local'
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        title: 'ROI',
                        items: [
                            {
                                xtype: 'combobox',
                                labelWidth: 150,
                                fieldLabel: 'ROI Offnet Voice',
                                name: 'RoiOffnetVoice',
                                bind: {
                                    store: '{queues}'
                                },
                                valueField: 'name',
                                displayField: 'name',
                                typeAhead: true,
                                queryMode: 'local'
                            },
                            {
                                xtype: 'combobox',
                                labelWidth: 150,
                                fieldLabel: 'ROI Rural Offnet BB',
                                name: 'RoiRuralOffnetBroadband',
                                bind: {
                                    store: '{queues}'
                                },
                                valueField: 'name',
                                displayField: 'name',
                                typeAhead: true,
                                queryMode: 'local'
                            },
                            {
                                xtype: 'combobox',
                                labelWidth: 150,
                                fieldLabel: 'ROI Urban Offnet BB',
                                name: 'RoiUrbanOffnetBroadband',
                                bind: {
                                    store: '{queues}'
                                },
                                valueField: 'name',
                                displayField: 'name',
                                typeAhead: true,
                                queryMode: 'local'
                            },
                            {
                                xtype: 'combobox',
                                labelWidth: 150,
                                fieldLabel: 'ROI FTTC',
                                name: 'RoiFttc',
                                bind: {
                                    store: '{queues}'
                                },
                                valueField: 'name',
                                displayField: 'name',
                                typeAhead: true,
                                queryMode: 'local'
                            }
                        ]
                    }
                ]
            }
            //{
            //    xtype: 'combobox',
            //    width: 380,
            //    labelWidth: 150,
            //    fieldLabel: 'Domain',
            //    allowBlank: false,
            //    bind: {
            //        store: '{queueDomains}',
            //        value: '{queue.domain}'
            //    },
            //    valueField: 'name',
            //    displayField: 'name',
            //    editable: false,
            //    emptyText: 'Select a Domain...'
            //},
            //{
            //    xtype: 'checkbox',
            //    labelWidth: 250,
            //    fieldLabel: 'Manual Transfer Allowed:',
            //    name: 'manualTransferAllowed',
            //    bind: {
            //        value: '{queue.manualTransferAllowed}'
            //    }
            //}

        ]
    }]
});