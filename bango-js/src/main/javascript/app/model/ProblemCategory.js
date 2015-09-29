Ext.define('Spm.model.ProblemCategory', {
    extend: 'Ext.data.Model',
    alias: 'model.problemCategory',

    requires: [
        'Ext.data.identifier.Negative'
    ],

    idProperty: 'id',
    identifier: 'negative',

    fields: [
        {
            name: 'id',
            mapping: 'problemCode'
        },
        {
            name: 'description'
        },
        {
            name: 'queueRouting',
            defaultValue: []
        },
        {
            name: 'forceAutoTroubleReport',
            defaultValue: false
        }
    ],

    problemCode: function () {
        return this.get('problemCode');
    },

    description: function () {
        return this.get('description');
    },

    forceAutoTroubleReport: function () {
        return this.get('forceAutoTroubleReport');
    }

});