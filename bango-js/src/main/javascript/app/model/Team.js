Ext.define('Spm.model.Team', {
    extend: 'Ext.data.Model',
    alias: 'model.team',
    requires: [
        'Spm.model.Queue',
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
                return QueueReader.arrayFromJson(rawQueues);
            }
        }
    ],

    teamId: function () {
        return this.get('id');
    },

    assignedQueues: function() {
        return this.get('assignedQueues');
    }

});