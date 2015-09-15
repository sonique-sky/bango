Ext.define('Spm.model.Team', {
    extend: 'Ext.data.Model',
    alias: 'model.team',

    requires: [
        'Spm.reader.QueueReader'
    ],

    fields: [
        {
            name: 'id',
            critical: true
        },
        {
            name: 'name',
            critical: true
        },
        {
            name: 'description'
        },
        {
            name: 'assignedQueues',
            convert: function (rawQueues) {
                return Spm.reader.QueueReader.arrayFromJson(rawQueues);
            }
        }
    ],

    teamId: function () {
        return this.get('id');
    },

    teamName: function () {
        return this.get('name');
    },

    assignedQueues: function () {
        return this.get('assignedQueues');
    }

});