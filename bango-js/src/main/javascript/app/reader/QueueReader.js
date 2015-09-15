Ext.define('Spm.reader.QueueReader', {
    extend: 'Ext.data.reader.Json',
    alternateClassName: 'QueueReader',

    singleton: true,

    requires: [
        'Spm.model.Queue'
    ],

    model: 'Spm.model.Queue',

    arrayFromJson: function (json) {
        return this.read(json).getRecords();
    },

    fromJsonString: function (jsonString) {
        return this.fromJson(Ext.JSON.decode(jsonString));
    },

    fromJson: function (json) {
        return this.read(json).getRecords()[0];
    }
});
