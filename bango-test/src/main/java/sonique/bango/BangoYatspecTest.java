package sonique.bango;

import com.googlecode.yatspec.junit.SpecRunner;
import com.googlecode.yatspec.state.givenwhenthen.*;
import org.hamcrest.Matcher;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import sonique.bango.domain.Agent;
import sonique.bango.driver.ScenarioDriver;
import sonique.bango.driver.SupermanApp;
import sonique.bango.driver.panel.HeaderPanel;
import sonique.bango.driver.panel.LoginDialog;

import static org.hamcrest.MatcherAssert.assertThat;
import static sonique.bango.matcher.IsDisplayed.isDisplayed;

@RunWith(SpecRunner.class)
public abstract class BangoYatspecTest extends OncePerSuiteBangoTest implements WithTestState {

    private TestState testState = new TestState();
    protected SupermanApp supermanApp;
    protected Agent agentForTest;

    protected abstract Agent agentForTest();

    @Before
    public void beforeTest() throws Exception {
        supermanApp = bangoTestEnvironment.borrowSupermanApp();
        agentForTest = agentForTest();

        scenarioDriver.registerAgent(agentForTest);
        testState.interestingGivens.add("Agent", agentForTest);
    }

    @After
    public void afterTest() throws Exception {
        HeaderPanel headerPanel = supermanApp.appContainer().headerPanel();
        if(headerPanel.isDisplayed()) {
            headerPanel.logout();
        }
        bangoTestEnvironment.releaseSupermanApp(supermanApp);
        scenarioDriver.deRegisterAgent(agentForTest);
    }

    @Override
    public TestState testState() {
        return testState;
    }

    protected void loginAgent() {
        LoginDialog loginDialog = supermanApp.loginDialog();
        loginDialog.username().enter(agentForTest.agentCode());
        loginDialog.password().enter(agentForTest.password());

        loginDialog.loginButton().click();

        assertThat(supermanApp.appContainer().headerPanel(), isDisplayed());
    }

    protected ScenarioDriver scenarioDriver() {
        return scenarioDriver;
    }

    public TestState given(GivensBuilder builder) throws Exception {
        return testState.given(builder);
    }

    public TestState and(GivensBuilder builder) throws Exception {
        return given(builder);
    }

    public TestState when(ActionUnderTest actionUndertest) throws Exception {
        return testState.when(actionUndertest);
    }

    public <ItemOfInterest> TestState then(StateExtractor<ItemOfInterest> extractor, Matcher<? super ItemOfInterest> matcher) throws Exception {
        return testState.then(extractor, matcher);
    }
}