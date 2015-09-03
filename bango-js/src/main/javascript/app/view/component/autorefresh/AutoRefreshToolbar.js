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

    refreshOptions: [
     //   {text: '5 Second', value: 5000},
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
                me.getStore().reload();
            },
            fireOnStart: true,
            scope: me
        });

        me.callParent();
    },

    onAdded: function (parent) {
        this.mon(parent, 'activate', this.restartMyTask, this);
        this.mon(parent, 'deactivate', this.stopMyTask, this);
    },

    getAutoRefreshItems: function () {
        return [
            {
                xtype: 'button',
                text: 'Refresh',
                iconCls: Ext.baseCSSPrefix + 'tbar-loading',
                menu: {
                    xtype: 'menu',
                    reference: 'refreshMenu',
                    defaults: {
                        handler: 'refreshPeriodChanged',
                        scope: this,
                        group: 'refresh',
                        checked: false
                    },
                    items: Ext.Array.insert(this.refreshOptions, 0, [{text: this.disabledText, value: -1, checked: true}])
                }
            },
            "-",
            {
                xtype: 'tbtext',
                itemId: 'refreshText',
                text: this.textPrefix + this.disabledText
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
})
;
