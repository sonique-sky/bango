Ext.define('Spm.view.navigation.SearchPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.searchPanel',
    requires: ['Ext.form.RadioGroup'],

    cls: 'search-panel',
    iconCls: 'icon-search',
    title: 'Search',
    layout: 'vbox',

    initComponent: function () {
        var me = this;

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
                        {
                            xtype: 'button',
                            text: 'Search',
                            disabled: true,
                            handler: me.onSearch,
                            scope: me
                        }
                    ]
                }
            ]});

        me.callParent(arguments);
    },

    onValidityChange: function(form, valid) {
        this.down('button').setDisabled(!valid);
    },

    onSearch: function () {
        var radioGroup = this.down('radiogroup');
        var textField = this.down('textfield');

        if (this.isValid()) {
            this.fireEvent('searchStarted', Ext.apply(radioGroup.getValue(), {searchParameter: textField.getValue()}));
        }
    },

    onSpecialKey: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearch();
        }
    }
});