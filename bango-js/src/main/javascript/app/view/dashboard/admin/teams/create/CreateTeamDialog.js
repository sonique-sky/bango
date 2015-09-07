Ext.define('Spm.view.dashboard.admin.teams.create.CreateTeamDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.createTeamDialog',

    controller: 'createTeamDialog',
    viewModel: 'createTeamDialog',
    title: 'Create Team',

    height: 110,
    width: 430,
    defaultFocus: 'teamNameField',

    layout: {
        type: 'vbox',
        vertical: false,
        align: 'middle',
        padding: 10
    },

    modal: true,

    items: [
        {
            xtype: 'textfield',
            flex: 4,
            itemId: 'teamNameField',
            fieldLabel: 'Team Name',
            allowBlank: false,
            bind: {
                value: '{team.name}'
            },
            listeners: {
                specialkey: 'submitOnEnter'
            }
        }
    ]
});
