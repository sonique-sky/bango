Ext.define('Spm.view.serviceproblem.eventhistory.AddNoteDialog', {
    extend: 'Spm.view.component.StandardDialog',
    alias: 'widget.addNoteDialog',

    height: 350,
    width: 600,
    title: 'Add Note',
    cls: 'add-note-dialog',

    controller: 'addNoteDialog',
    viewModel: {type: 'addNoteDialog'},

    items: [
        {
            xtype: 'textareafield',
            allowBlank: false,
            bind: {
                value: '{noteText}'
            }
        }
    ]
});