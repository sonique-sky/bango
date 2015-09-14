Ext.define('Spm.store.Roles', {
    extend: 'Ext.data.Store',
    alias: 'store.roles',

    sorters: 'description',

    fields: ['name', 'description'],
    data: [
        {name: 'ROLE_USER', description: 'Team Member'},
        {name: 'ROLE_TEAM_LEAD', description: 'Team Leader'},
        {name: 'ROLE_QUEUE_CONTROLLER', description: 'Queue Controller'},
        {name: 'ROLE_MSP_ADMINISTRATOR', description: 'Msp Administrator'}
    ]
});