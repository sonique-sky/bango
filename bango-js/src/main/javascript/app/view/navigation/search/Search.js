Ext.define('Spm.view.navigation.search.Search', {
    extend: 'Ext.form.Panel',
    alias: 'widget.search',
    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.RadioGroup',
        'Ext.form.field.Text',
        'Ext.layout.container.VBox',
        'Spm.view.navigation.search.SearchViewController',
        'Spm.view.navigation.search.SearchViewModel'
    ],

    viewModel: {type: 'search'},
    controller: 'search',
    reference: 'search',

    cls: 'search-panel',
    iconCls: 'icon-search',
    title: 'Search',
    layout: 'vbox',
    itemId: 'searchPanel',
    collapsible: true,

    items: [
        {
            xtype: 'radiogroup',
            columns: 1,
            bind: {
                value: '{radioValue}'
            },
            defaults: {
                name: 'searchTerm'
            },
            items: [
                {
                    boxLabel: 'Service Problem ID',
                    inputValue: 'serviceProblemId'
                },
                {
                    boxLabel: 'Service ID',
                    inputValue: 'serviceId'
                },
                {
                    boxLabel: 'Directory Number',
                    inputValue: 'directoryNumber'
                },
                {
                    boxLabel: 'MSP ID',
                    inputValue: 'mspId'
                }
            ]
        },
        {
            xtype: 'container',
            margin: 3,
            width: '100%',
            defaults: {
                width: '100%'
            },
            items: [
                {
                    xtype: 'textfield',
                    allowBlank: false,
                    preventMark: true,
                    listeners: {
                        specialkey: 'onSpecialKey'
                    },
                    bind: {
                        value: '{searchParameter}'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Search',
                    handler: 'onSearch',
                    bind: {
                        disabled: '{searchButtonDisabled}'
                    }
                }
            ]
        }
    ]
});