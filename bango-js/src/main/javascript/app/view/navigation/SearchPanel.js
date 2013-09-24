Ext.define('Spm.view.navigation.SearchPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.searchPanel',
    requires: [
        'Ext.form.RadioGroup',
        'Spm.controller.action.SearchAction',
        'Spm.view.search.SearchResultTabContent'
    ],

    cls: 'search-panel',
    iconCls: 'icon-search',
    title: 'Search',
    layout: 'vbox',

    mixins: {
        isActionContext: 'Spm.controller.mixins.IsActionContext'
    },

    constructor: function () {
        this.mixins.isActionContext.constructor.call(this);

        this.callParent(arguments);
    },

    initComponent: function () {
        var me = this;

        this.registeredActions = this.actionContextManager.registerActionsFor(this, [
            'Spm.action.SearchAction'
        ]);
        var searchButton = Ext.widget('button', this.registeredActions.actionNamed('search'));

        Ext.applyIf(me, {
            listeners: {
                validitychange: me.onValidityChange
            },
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
                            listeners: {
                                specialkey: me.onSpecialKey,
                                scope: me
                            }
                        },
                        searchButton
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onValidityChange: function () {
        this.actionContextManager.updateActionStates(this)
    },

    onSpecialKey: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.registeredActions.actionNamed('search').handleAction(field);
        }
    }
});