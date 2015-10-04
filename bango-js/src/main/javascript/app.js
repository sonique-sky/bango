/*
 This file is generated and updated by Sencha Cmd. You can edit this file as
 needed for your application, but these edits will have to be merged by
 Sencha Cmd when upgrading.
 */
Ext.Loader.setConfig({
    enabled: true,
    disableCaching: true
});

/*
 Prevents Ext from complaining about failure to conform to Aria standards when
 correct behaviour is being replicated from SPM.
 */
Ext.enableAriaButtons = false;

Ext.application({
    name: 'Spm',

    requires: [
        'Spm.view.Superman'
    ],

    launch: function () {
        Ext.create('Spm.view.Superman');
    }

});
