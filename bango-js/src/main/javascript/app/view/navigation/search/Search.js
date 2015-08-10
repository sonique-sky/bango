Ext.define('Spm.view.navigation.search.Search', {
    extend: 'Ext.form.Panel',
    alias: 'widget.search',
    requires: [
        'Ext.form.RadioGroup',
        'Spm.controller.action.SearchAction',
        'Spm.view.search.SearchResultTabContent'
    ],

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
            items: [
                {
                    boxLabel: 'Service Problem ID',
                    name: 'searchType',
                    inputValue: 'serviceProblemId',
                    checked: true
                },
                {
                    boxLabel: 'Service ID',
                    name: 'searchType',
                    inputValue: 'serviceId'
                },
                {
                    boxLabel: 'Directory Number',
                    name: 'searchType',
                    inputValue: 'directoryNumber'
                },
                {
                    boxLabel: 'MSP ID',
                    name: 'searchType',
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
                    }
                },
                {
                    xtype: 'button',
                    text: 'Search'
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

    reset: function() {
        this.getForm().reset();
    }
});