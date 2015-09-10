Ext.define('Spm.view.serviceproblem.nextworkitem.NextWorkItemDialog', {
        extend: 'Spm.component.StandardDialog',
        alias: 'widget.nextWorkItemDialog',

        viewModel: {type: 'nextWorkItemDialog'},
        controller: 'nextWorkItemDialog',

        title: 'Select Next Work Item',
        iconCls: 'icon-next-work-item',

        height: 110,
        width: 750,

        listeners: {
            show: 'onShow'
        },

        items: [
            {
                xtype: 'form',
                bodyPadding: 10,
                reference: 'nextWorkItemForm',
                listeners: {
                    validitychange: 'onValidityChange'
                },
                items: [
                    {
                        xtype: 'fieldcontainer',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            labelWidth: 130
                        },
                        items: [
                            {
                                xtype: 'combobox',
                                fieldLabel: 'Next Action',
                                displayField: 'description',
                                valueField: 'name',
                                bind: {
                                    value: '{nextWorkItem}',
                                    store: '{workItemActions}'
                                },
                                typeAhead: true,
                                forceSelection: true,
                                allowBlank: false,
                                emptyText: 'Please select Next Action...',
                                queryMode: 'local'
                            }
                        ]
                    }]
            }
        ]
    }
);
