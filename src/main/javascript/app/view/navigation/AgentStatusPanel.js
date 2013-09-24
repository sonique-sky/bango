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

    registeredActions: undefined,

    requires: [
        'Spm.controller.action.ToggleAvailabilityAction'
    ],

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
            'Spm.action.ToggleAvailabilityAction'
        ]);

        this.statusLabel = Ext.widget('label', {margin: '0 0 2 0'});
        this.availabilityButton = Ext.widget('button', this.registeredActions.actionNamed('toggle-availability'));
        Ext.applyIf(me, {
            items: [
                this.statusLabel,
                this.availabilityButton,
                {
                    xtype: 'dataview',
                    flex: 1,
                    id: 'inbox-stats-view',
                    itemTpl: Ext.create('Ext.XTemplate',
                            '<div id="inbox-stats">',
                            '	<div id="inbox-active-value">{activeCount}</div><div id="inbox-active-label">Active Items:</div>',
                            '	<div id="inbox-hold-value">{heldCount}</div><div id="inbox-hold-label">Held Items:</div>',
                            '</div>'
                    ),
                    store: 'AgentState'
                }
            ]
        });

        me.callParent(arguments);
    },

    updateState: function (isAvailable) {
        if (isAvailable) {
            this.statusLabel.removeCls('availability-indicator-off');
            this.statusLabel.addCls('availability-indicator-on');
            this.statusLabel.setText('Available');
            this.availabilityButton.setText('Make Me Unavailable');
        } else {
            this.statusLabel.removeCls('availability-indicator-on');
            this.statusLabel.addCls('availability-indicator-off');
            this.statusLabel.setText('Unavailable');
            this.availabilityButton.setText('Make Me Available');
        }
    }

});