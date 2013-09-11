Ext.define('Spm.view.navigation.AgentStatusPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.agentStatusPanel',

    cls: 'status-panel',
    height: 126,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    bodyPadding: 5,
    iconCls: 'icon-status',
    title: 'My Status',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'dataview',
                    flex: 1,
                    id: 'inbox-stats-view',
                    itemTpl: Ext.create('Ext.XTemplate',
                            '<div>',
                            '    <div class="{[this.labelClass(values.isAvailable)]}">{[this.labelText(values.isAvailable)]}</div>',
                            '    <div id="toggle-button-wrapper"></div>',
                            '	 <div id="inbox-stats">',
                            '		<div id="inbox-active-value">{activeCount}</div><div id="inbox-active-label">Active Items:</div>',
                            '		<div id="inbox-hold-value">{heldCount}</div><div id="inbox-hold-label">Held Items:</div>',
                            '	</div>',
                            '</div>',
                            {
                                labelClass: function (isAvailable) {
                                    return isAvailable ? "availability-indicator-on" : "availability-indicator-off";
                                },
                                labelText: function (isAvailable) {
                                    return isAvailable ? "Available" : "Unavailable";
                                }
                            }
                    ),
                    store: 'AuthenticatedAgent',
                    listeners: {
                        refresh: {
                            fn: me.renderAvailabilityButton,
                            scope: me
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    renderAvailabilityButton: function (dataview) {
        if (!dataview.getStore().isLoading()) {
            Ext.destroy(this.toggleButton);
            this.toggleButton = Ext.create('Ext.button.Button', {
                renderTo: 'toggle-button-wrapper',
                text: 'Toggle Availability',
                width: '100%',
                id: 'toggle-button'
            });
        }
    }

});