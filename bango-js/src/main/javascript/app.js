/*
 This file is generated and updated by Sencha Cmd. You can edit this file as
 needed for your application, but these edits will have to be merged by
 Sencha Cmd when upgrading.
 */
//@require @packageOverrides
Ext.Loader.setConfig({
    enabled: true,
    disableCaching: true
});

Ext.application({
    name: 'Spm',

    requires: [
        'Spm.view.Superman'
    ],

    controllers: [
        'Errors'
    ],

    launch: function () {
        Ext.create('Spm.view.Superman');
    }
});
