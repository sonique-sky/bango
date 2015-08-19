Ext.define('Spm.proxy.AdminTeamsProxy', {
    extend: 'Ext.data.proxy.Rest',
    alias: 'proxy.adminTeamsProxy',

    url: 'api/teams',
    reader: {
        type: 'json'
    }
});