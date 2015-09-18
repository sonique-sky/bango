Ext.define('Spm.store.Roles', {
    extend: 'Ext.data.Store',
    alias: 'store.roles',

    requires: [
        'Spm.model.Role'
    ],

    model: 'Spm.model.Role',

    sorters: {
        property: 'description',
        direction: 'DESC'
    },

    data: [
        {name: 'ROLE_USER', rank: 1, description: 'Team Member', privileges: [], mayBeTeamMember: true},
        {name: 'ROLE_TEAM_LEAD', rank: 2, description: 'Team Leader', privileges: [], mayBeTeamMember: true},
        {name: 'ROLE_QUEUE_CONTROLLER', rank: 3, description: 'Queue Controller', privileges: [], mayBeTeamMember: false},
        {name: 'ROLE_MSP_ADMINISTRATOR', rank: 4, description: 'Msp Administrator', privileges: [], mayBeTeamMember: true}
    ]

});