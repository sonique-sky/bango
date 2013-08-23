Ext.define('Spm.controller.QueueController', {

    extend: 'Ext.app.Controller',
    alias: 'controller.queueController',

    mixins: [
        'Spm.mixin.TabHeaderId'
    ],
    requires: [
        'Spm.mixin.TabHeaderId'
    ],

    views: [
        'QueueContainer'
    ],

    constructor: function(cfg) {
        cfg = cfg || {};
        this.callParent(this.processQueueController(cfg));
    },

    processQueueController: function(config) {
        this.queue = config.queue;

        console.log(this.getApplication());
        console.log(Spm.application);

        return config;
    },

    tabView: function() {
        var items = [];
        var config = {};

        items.push(Ext.widget('queueContainer', {id: this.queueIdThing(), queue: this.queue}));

        config.items = items;

        config.closable = true;
        config.title = this.queue.get('name');

        return config;
    },

    init: function(application) {
        var selector = 'a#foo-'+this.queue.get('id');
        console.log(selector);
        this.control({
            selector: {
                click: this.onButtonClick
            }
        });
    },

    queueIdThing: function() {
        return 'queue-container-' + this.queue.get('id')
    },

    onButtonClick: function(button,e,eOpts) {
        console.log(button);
    }

});
