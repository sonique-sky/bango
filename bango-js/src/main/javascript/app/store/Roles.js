Ext.define('Spm.store.Roles', {
    extend: 'Ext.data.Store',
    alias: 'store.roles',

    fields: ['name', 'description'],

    sorters: 'description',

    data: [
        {name: 'ROLE_USER', description: 'Team Member', canBeTeamMember: true},
        {name: 'ROLE_TEAM_LEAD', description: 'Team Leader', canBeTeamMember: true},
        {name: 'ROLE_QUEUE_CONTROLLER', description: 'Queue Controller'},
        {name: 'ROLE_MSP_ADMINISTRATOR', description: 'Msp Administrator', canBeTeamMember: true}
    ]
});