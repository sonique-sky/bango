package sonique.bango;

import com.google.common.collect.Lists;
import org.junit.Before;
import org.junit.Test;
import sonique.bango.domain.Agent;
import sonique.bango.domain.Queue;
import sonique.bango.domain.Role;
import sonique.bango.driver.panel.HeaderPanel;
import sonique.bango.driver.panel.LoginDialog;
import sonique.bango.driver.panel.MessageBox;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.isEmptyString;
import static sonique.bango.matcher.IsDisabled.isDisabled;
import static sonique.bango.matcher.IsDisplayed.isDisplayed;
import static sonique.bango.matcher.IsEnabled.isEnabled;
import static sonique.bango.matcher.IsNotDisplayed.isNotDisplayed;

public class LoginDialogTest extends BaseBangoTest {

    private LoginDialog loginDialog;

    @Before
    public void setUp() throws Exception {
        loginDialog = supermanApp.loginDialog();
        loginDialog.username().clear();
        loginDialog.password().clear();
    }

    @Test
    public void loginButtonIsDisabledWhenNoFieldsPopulated() throws Exception {
        assertThat(loginDialog.loginButton(), isDisabled());
    }

    @Test
    public void loginButtonIsDisabledWhenOnlyUsernameFieldIsPopulated() throws Exception {
        loginDialog.username().enter("a.a");
        loginDialog.password().clear();
        assertThat(loginDialog.loginButton(), isDisabled());
    }

    @Test
    public void loginButtonIsEnabledWhenBothFieldsArePopulated() throws Exception {
        loginDialog.username().enter("a.a");
        loginDialog.password().enter("asds");

        assertThat(loginDialog.loginButton(), isEnabled());
    }

    @Test
    public void resetButtonEmptiesTheFieldsAndDisablesTheLoginButton() throws Exception {
        loginDialog.username().enter("a.a");
        loginDialog.password().enter("dsfsdfs");

        loginDialog.resetButton().click();

        assertThat(loginDialog.username().value(), isEmptyString());
        assertThat(loginDialog.password().value(), isEmptyString());
        assertThat(loginDialog.loginButton(), isDisabled());
    }

    @Test
    public void showsErrorWhenIncorrectDetailsAreEntered() throws Exception {
        loginDialog.username().enter("wilbur");
        loginDialog.password().enter("junk");

        loginDialog.loginButton().click();

        MessageBox notificationWindow = supermanApp.messageBox();
        assertThat(notificationWindow, isDisplayed());
        notificationWindow.clickOk();
    }

    @Test
    public void logsInWhenCorrectDetailsAreEntered() throws Exception {
        Agent agent = new Agent("K.K", Lists.<Queue>newArrayList(), Role.ROLE_USER);

        register(agent);

        loginDialog.username().enter(agent.agentCode());
        loginDialog.password().enter(agent.password());

        loginDialog.loginButton().click();

        assertThat(loginDialog, isNotDisplayed());
        HeaderPanel headerPanel = supermanApp.appContainer().headerPanel();

        assertThat(headerPanel, isDisplayed());
        assertThat(headerPanel.loginName(), is(agent.displayName()));
    }
}