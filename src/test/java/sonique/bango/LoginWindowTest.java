package sonique.bango;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import sonique.bango.driver.component.LoginWindow;
import sonique.bango.driver.component.SupermanApp;

import static org.hamcrest.Matchers.isEmptyString;
import static org.junit.Assert.assertThat;
import static sonique.bango.matcher.IsDisabledMatcher.isDisabled;
import static sonique.bango.matcher.IsDisabledMatcher.isNotDisabled;

public class LoginWindowTest {

    private static SupermanApp supermanApp;
    private LoginWindow loginWindow;

    @BeforeClass
    public static void createSupermanApp() throws Exception {
        supermanApp = new SupermanApp();
    }

    @Before
    public void setUp() throws Exception {
        loginWindow = supermanApp.loginWindow();
    }

    @Test
    public void loginButtonIsDisabledWhenNoFieldsPopulated() throws Exception {
        loginWindow.username().clear();
        loginWindow.password().clear();
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
    public void resetButtonEmptiesTheFields() throws Exception {
        loginWindow.username().enter("a.a");
        loginWindow.password().enter("dsfsdfs");

        loginWindow.resetButton().click();

        assertThat(loginWindow.username().value(), isEmptyString());
        assertThat(loginWindow.password().value(), isEmptyString());
        assertThat(loginWindow.loginButton(), isDisabled());
    }
}