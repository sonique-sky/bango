Ext.define('Spm.proxy.FeatureCheckProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.featureCheckProxy',

    buildUrl: function (request) {
        var params = request.getParams();

        if ('read' === request.getAction()) {
            var serviceProblemId = params.serviceProblemId;

            delete params.id;
            delete params.serviceProblemId;

            return Ext.String.format('api/featureCheck/{0}', serviceProblemId);
        }
    },

    reader: {
        type: 'json',
        rootProperty: 'data'
    }

});