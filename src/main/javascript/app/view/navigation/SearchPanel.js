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
                        width: '100%',
                        listeners: {
                            specialkey: me.onSpecialKey,
                            scope: me
                        }
                    },
                    items: [
                        {
                            xtype: 'textfield'
                        },
                        {
                            xtype: 'button',
                            text: 'Search',
                            handler: me.onSearch,
                            scope: me
                        }
                    ]
                }


            ]});

        me.callParent(arguments);
    },

    onSearch: function () {
        var radioGroup = this.down('radiogroup');
        var textField = this.down('textfield');

        if (this.validate(textField)) {
            this.fireEvent('searchStarted', Ext.apply(radioGroup.getValue(), {searchParameter: textField.getValue()}));
        }
    },

    onSpecialKey: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearch();
        }
    },

    validate: function(textfield){
        if(this.isEmpty(textfield)){
            Ext.Msg.show({
                title: 'Search error',
                msg: 'Please enter a value',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.INFO,
                fn: function(){
                    textfield.focus();
                }
            });
            return false;
        }
        return true;
    },

    isEmpty: function(textfield) {
        if(textfield.getValue() == '') {
            return true;
        }
        return false;
    }
});