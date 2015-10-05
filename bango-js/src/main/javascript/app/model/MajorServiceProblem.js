Ext.define('Spm.model.MajorServiceProblem', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'description', type: 'string'},
        {name: 'startDate', type: 'date'},
        {name: 'startTime', type: 'date'},
        {name: 'expectedResolutionDate', type: 'date'},
        {name: 'detailedNote', type: 'string'}
    ],

    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        url: 'api/msp'
    }
});