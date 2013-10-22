package sonique.bango.action;

import sky.sns.spm.domain.model.DomainAgent;
import sonique.bango.app.SupermanApp;
import sonique.bango.driver.panel.dialog.LoginDialog;

import static org.hamcrest.MatcherAssert.assertThat;
import static sonique.bango.matcher.IsDisplayed.isDisplayed;

public class LoginAction implements BangoAction{
    private final SupermanApp supermanApp;
    private final DomainAgent agent;

    public LoginAction(SupermanApp supermanApp, DomainAgent agent) {
        this.supermanApp = supermanApp;
        this.agent = agent;
    }

    @Override
    public void goBango() {
        LoginDialog loginDialog = supermanApp.dialogs().login();
        loginDialog.username().enter(agent.getAgentCode());
        loginDialog.password().enter("a");

        loginDialog.loginButton().click();

        assertThat(supermanApp.appContainer().headerPanel(), isDisplayed());

    }
}
