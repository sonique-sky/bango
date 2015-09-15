Ext.define('Spm.store.Roles', {
    extend: 'Ext.data.Store',
    alias: 'store.roles',

    requires: [
        'Spm.model.Role'
    ],

    model: 'Spm.model.Role',

    sorters: 'description',

    data: [
        {name: 'ROLE_USER', description: 'Team Member', privileges: []},
        {name: 'ROLE_TEAM_LEAD', description: 'Team Leader', privileges: []},
        {name: 'ROLE_QUEUE_CONTROLLER', description: 'Queue Controller', privileges: []},
        {name: 'ROLE_MSP_ADMINISTRATOR', description: 'Msp Administrator', privileges: []}
    ]

});