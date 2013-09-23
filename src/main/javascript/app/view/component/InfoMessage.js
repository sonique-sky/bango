Ext.define('Spm.view.component.InfoMessage', {
    alias: 'widget.infoMessage',
    extend: 'Ext.window.Window',


    statics: {
        display: function (title, messageFormat) {
            var window = Ext.widget('infoMessage', {
                message: Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1)),
                title: title
            });

            window.showforabit();

        }
    },

    initComponent: function () {
        var me = this;

        var viewport = Ext.ComponentQuery.query('viewport')[0];

        var defaultHeight = 65;
        var defaultWidth = 300;

        Ext.apply(me, {
            width: defaultWidth,
            height: defaultHeight,
            x: viewport.getWidth() - defaultWidth,
            y: viewport.getHeight() - defaultHeight,
            closable: false,
            border: false,
            modal: false,
            floating: true,
            draggable: false,
            items: [
                {
                    xtype: 'label',
                    text: me.message
                }
            ]
        });

        this.callParent(arguments);
    },

    showforabit: function () {
        var me = this;

        Ext.create('Ext.fx.Anim', {
            target: this,
            duration: 1500,
            from: {
                opacity: 0
            },
            to: {
                opacity: 1
            }
        });

        me.show();

        Ext.util.TaskManager.start({
                    run: function (runNumber) {
                        if (runNumber > 1) {
                            Ext.create('Ext.fx.Anim', {
                                target: me,
                                duration: 1500,
                                from: {
                                    opacity: 1
                                },
                                to: {
                                    opacity: 0
                                },
                                callback: function () {
                                    me.destroy();
                                }

                            });
                            return false;
                        }

                        return true;
                    },
                    interval: 3000
                }
        );
    }
});