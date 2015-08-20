Ext.define('Spm.proxy.TeamsProxy', {
    extend: 'Ext.data.proxy.Rest',
    alias: 'proxy.teamsProxy',

    url: 'api/teams',
    reader: {
        type: 'json'
    }
});