Ext.define('Spm.reader.QueueReader', {
    extend: 'Ext.data.reader.Json',
    alternateClassName: 'QueueReader',

    singleton: true,

    requires: [
        'Spm.model.Queue'
    ],

    model: 'Spm.model.Queue',

    arrayFromJson: function(json) {
        return this.read(json).getRecords();
    }
});