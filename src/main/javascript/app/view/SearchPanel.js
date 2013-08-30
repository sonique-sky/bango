Ext.define('Spm.view.SearchPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.searchPanel',

    cls: 'search-panel',
    title: 'Search',
    layout: 'fit',
    margin: 3,
    height: 150,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldcontainer',
                    defaultType: 'radiofield',
                    layout: 'vbox',
                    items: [
                        {
                            boxLabel: 'Service Problem ID',
                            name: 'serviceProblemId',
                            inputValue: 'serviceProblemId',
                            id: 'serviceProblemId'
                        },
                        {
                            boxLabel: 'Service ID',
                            name: 'serviceId',
                            inputValue: 'serviceId',
                            id: 'serviceId'
                        },
                        {
                            boxLabel: 'Directory Number',
                            name: 'directoryNumber',
                            inputValue: 'directoryNumber',
                            id: 'directoryNumber'
                        },
                        {
                            boxLabel: 'MSP ID',
                            name: 'mspId',
                            inputValue: 'mspId',
                            id: 'mspId'
                        }
                    ]
                }
            ]});

        me.callParent(arguments);
    }
});