Ext.define('Spm.view.component.AutoRefreshToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: ['widget.autorefreshtoolbar', 'widget.autorefresh'],

    require: [
        'Ext.toolbar.TextItem',
        'Ext.toolbar.Spacer',
        'Ext.util.TaskManager'
    ],

    mixins: [
        'Ext.util.StoreHolder'
    ],

    textPrefix: 'Auto Refresh : ',
    prependButtons: true,
    disabledText: 'Disabled',

    defaultRefresh: undefined,

    refreshOptions: [
        {text: 'Disabled', value: -1},
        //{text: '5 Second', value: 5000},
        {text: '1 Minute', value: 60000},
        {text: '5 Minutes', value: 300000},
        {text: '10 Minutes', value: 600000},
        {text: '15 Minutes', value: 900000},
        {text: '30 Minutes', value: 1800000}
    ],

    myTask: undefined,

    initComponent: function () {
        var me = this,
            userItems = me.items || me.buttons || []
            ;

        me.defaultRefresh = me.refreshOptions[0];
        me.defaultRefresh.checked = true;

        var autoRefreshItems = me.getAutoRefreshItems();

        if (me.prependButtons) {
            me.items = userItems.concat(autoRefreshItems);
        } else {
            me.items = autoRefreshItems.concat(userItems);
        }
        delete me.buttons;

        me.bindStore(me.store || 'ext-empty-store', true);

        me.myTask = Ext.TaskManager.newTask({
            run: function () {
                if (!me.up('[hidden=true]')) {
                    me.getStore().reload();
                }
            },
            fireOnStart: true,
            scope: me
        });

        me.callParent();
    },

    getAutoRefreshItems: function () {
        return [
            {
                xtype: 'button',
                text: 'Refresh',
                iconCls: Ext.baseCSSPrefix + 'tbar-loading',
                menu: {
                    xtype: 'menu',
                    defaults: {
                        handler: 'refreshPeriodChanged',
                        scope: this,
                        group: 'refresh',
                        checked: false
                    },
                    items: this.refreshOptions
                }
            },
            "-",
            {
                xtype: 'tbtext',
                itemId: 'refreshText',
                text: this.textPrefix + this.defaultRefresh.text
            }
        ]
    },

    updateRefreshText: function (currentRefresh) {
        this.child('#refreshText').setText(this.textPrefix + currentRefresh)
    },

    refreshPeriodChanged: function (item) {
        this.updateRefreshText(item.text);

        this.stopMyTask();

        if (item.value > 0) {
            this.myTask.restart(item.value);
        }
    },

    stopMyTask: function () {
        if (this.myTask) {
            this.myTask.stop();
        }
    },

    restartMyTask: function () {
        if (this.myTask) {
            this.myTask.start();
        }
    },

    onDestroy: function () {
        this.myTask.destroy();

        this.bindStore(null);
        this.callParent();
    }
});
