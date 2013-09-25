package sonique.bango;

import com.google.common.collect.Lists;
import org.junit.Before;
import org.junit.Test;
import sonique.bango.domain.Agent;
import sonique.bango.domain.Queue;
import sonique.bango.domain.Role;
import sonique.bango.driver.panel.LoginWindow;
import sonique.bango.driver.panel.MessageBox;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.isEmptyString;
import static sonique.bango.matcher.IsDisabledMatcher.isDisabled;
import static sonique.bango.matcher.IsDisabledMatcher.isNotDisabled;
import static sonique.bango.matcher.IsDisplayedMatcher.isDisplayed;
import static sonique.bango.matcher.IsDisplayedMatcher.isNotDisplayed;

public class LoginWindowTest extends BaseBangoTest {

    private LoginWindow loginWindow;

    @Before
    public void setUp() throws Exception {
        loginWindow = supermanApp.loginWindow();
        loginWindow.username().clear();
        loginWindow.password().clear();
    }

    @Test
    public void loginButtonIsDisabledWhenNoFieldsPopulated() throws Exception {
        assertThat(loginWindow.loginButton(), isDisabled());
    }

    @Test
    public void loginButtonIsDisabledWhenOnlyUsernameFieldIsPopulated() throws Exception {
        loginWindow.username().enter("a.a");
        loginWindow.password().clear();
        assertThat(loginWindow.loginButton(), isDisabled());
    }

    @Test
    public void loginButtonIsEnabledWhenBothFieldsArePopulated() throws Exception {
        loginWindow.username().enter("a.a");
        loginWindow.password().enter("asds");

        assertThat(loginWindow.loginButton(), isNotDisabled());
    }

    @Test
    public void resetButtonEmptiesTheFieldsAndDisablesTheLoginButton() throws Exception {
        loginWindow.username().enter("a.a");
        loginWindow.password().enter("dsfsdfs");

        loginWindow.resetButton().click();

        assertThat(loginWindow.username().value(), isEmptyString());
        assertThat(loginWindow.password().value(), isEmptyString());
        assertThat(loginWindow.loginButton(), isDisabled());
    }

    @Test
    public void showsErrorWhenIncorrectDetailsAreEntered() throws Exception {
        loginWindow.username().enter("wilbur");
        loginWindow.password().enter("junk");

        loginWindow.loginButton().click();

        MessageBox notificationWindow = supermanApp.messageBox();
        assertThat(notificationWindow, isDisplayed());
        notificationWindow.clickOk();
    }

    @Test
    public void logsInWhenCorrectDetailsAreEntered() throws Exception {
        Agent agent = new Agent("K.K", Lists.<Queue>newArrayList(), Role.ROLE_USER);

        register(agent);

        loginWindow.username().enter(agent.agentCode());
        loginWindow.password().enter(agent.password());

        loginWindow.loginButton().click();

        assertThat(loginWindow, isNotDisplayed());
        assertThat(supermanApp.headerPanel(), isDisplayed());
    }
}