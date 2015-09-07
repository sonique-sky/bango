Ext.define('Spm.model.ProblemCategory', {
    extend: 'Ext.data.Model',
    alias: 'model.problemCategory',

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
            name: 'forceAutoTroubleReport'
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