Ext.define('Spm.view.navigation.search.Search', {
    extend: 'Ext.form.Panel',
    alias: 'widget.search',
    requires: [
        'Ext.form.RadioGroup',
        'Spm.controller.action.SearchAction',
        'Spm.view.search.SearchResultTab'
    ],

    viewModel: {type: 'search'},
    controller: 'search',
    reference: 'search',

    cls: 'search-panel',
    iconCls: 'icon-search',
    title: 'Search',
    layout: 'vbox',
    itemId: 'searchPanel',

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
    ],

    //initComponent: function () {
    //    var me = this;
    //
    //    this.registeredActions = this.actionContextManager.registerActionsFor(this, [
    //        'Spm.action.SearchAction'
    //    ]);
    //    var searchButton = Ext.widget('button', this.registeredActions.actionNamed('search'));
    //
    //    Ext.applyIf(me, {
    //        listeners: {
    //            validitychange: me.onValidityChange
    //        },
    //
    //    me.callParent(arguments);
    //},

    onValidityChange: function () {
        this.actionContextManager.updateActionStates(this)
    },

    onSpecialKey: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.registeredActions.actionNamed('search').handleAction(field);
        }
    },

    reset: function () {
        this.getForm().reset();
    }
});