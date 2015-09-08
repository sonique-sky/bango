Ext.define('Spm.view.serviceproblem.eventhistory.addnote.AddNoteDialog', {
    extend: 'Spm.component.StandardDialog',
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
                value: '{noteContent}'
            }
        }
    ]
});
