Ext.define('Spm.view.navigation.state.AgentState', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.agentState',

    requires: [
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.layout.container.VBox',
        'Ext.view.View',
        'Spm.view.navigation.state.AgentStateViewController',
        'Spm.view.navigation.state.AgentStateViewModel'
    ],

    controller: 'agentState',
    viewModel: {type: 'agentState'},
    reference: 'agentState',

    cls: 'status-panel',
    height: 126,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    bodyPadding: 5,
    iconCls: 'icon-status',
    title: 'My Status',

    items: [
        {
            xtype: 'label',
            reference: 'statusLabel',
            margin: '0 0 2 0',
            bind: {
                text: '{availabilityLabelText}'
            }
        },
        {
            xtype: 'button',
            id: 'toggle-availability',
            bind: {
                text: '{availabilityButtonText}',
                disabled: '{availabilityButtonDisabled}'
            },
            handler: 'toggleAvailability'
        },
        {
            xtype: 'dataview',
            loadMask: false,
            flex: 1,
            id: 'inbox-stats-view',
            itemTpl: Ext.create('Ext.XTemplate',
                '<div id="inbox-stats">',
                '	<div id="inbox-active-value">{activeCount}</div><div id="inbox-active-label">Active Items:</div>',
                '	<div id="inbox-hold-value">{heldCount}</div><div id="inbox-hold-label">Held Items:</div>',
                '</div>'
            ),
            bind: {
                store: '{agentState}'
            },
            listeners: {
                show: 'refreshAgentState'
            }
        }
    ]
});