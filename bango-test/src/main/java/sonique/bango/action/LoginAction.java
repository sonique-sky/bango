package sonique.bango.action;

import sky.sns.spm.domain.model.DomainAgent;
import sonique.bango.app.SupermanApp;
import sonique.bango.driver.panel.dialog.LoginDialog;

import static org.hamcrest.MatcherAssert.assertThat;
import static sonique.bango.matcher.IsDisplayed.isDisplayed;

public class LoginAction implements BangoAction{
    private final SupermanApp supermanApp;
    private final DomainAgent agent;
    private String password;

    public LoginAction(SupermanApp supermanApp, DomainAgent agent, String password) {
        this.supermanApp = supermanApp;
        this.agent = agent;
        this.password = password;
    }

    @Override
    public void goBango() {
        LoginDialog loginDialog = supermanApp.dialogs().login();
        loginDialog.username().enter(agent.getAgentCode());
        loginDialog.password().enter(password);

        loginDialog.loginButton().click();

        assertThat(supermanApp.appContainer().headerPanel(), isDisplayed());

    }
}
