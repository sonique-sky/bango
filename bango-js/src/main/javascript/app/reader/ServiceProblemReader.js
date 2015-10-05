Ext.define('Spm.reader.ServiceProblemReader', {
    extend: 'Ext.data.reader.Json',
    alternateClassName: 'Spm.ServiceProblemReader',

    singleton: true,

    requires: [
        'Spm.model.ServiceProblem'
    ],

    model: 'Spm.model.ServiceProblem',

    fromJsonString: function (jsonString) {
        return this.read(Ext.JSON.decode(jsonString).data).getRecords()[0];
    }

});
