Ext.define('Spm.model.Agent', {
    extend: 'Ext.data.Model',
    alias: 'model.agent',

    requires: [
        'Spm.model.Role',
        'Spm.model.Team'
    ],

    idProperty: 'code',

    fields: [
        {
            name: 'code',
            mapping: 'agentCode'
        },
        {
            name: 'displayName',
            mapping: 'details.displayName'
        },
        {
            name: 'role',
            sortType: function (role) {
                return role.description;
            }
        },
        {
            name: 'team',
            sortType: function (team) {
                return Ext.Object.isEmpty(team) ? '' : team.name;
            }
        },
        {
            name: 'agentAvailability'
        }
    ],

    getName: function() {
        return this.get('displayName');
    },

    agentCode: function () {
        return this.get('code');
    },

    hasPrivilege: function (privilege) {
        return Ext.Array.contains(this.get('role').privileges, privilege);
    },

    getTeam: function () {
        return new Spm.model.Team(this.get('team'));
    },

    getRole: function () {
        return new Spm.model.Role(this.get('role'));
    }

});
