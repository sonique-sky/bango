package sonique.bango;

import com.googlecode.yatspec.junit.SpecRunner;
import com.googlecode.yatspec.state.givenwhenthen.*;
import org.hamcrest.Matcher;
import org.junit.After;
import org.junit.Before;
import org.junit.runner.RunWith;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.refdata.Role;
import sonique.bango.driver.ScenarioDriver;
import sonique.bango.driver.SupermanApp;
import sonique.bango.driver.panel.HeaderPanel;
import sonique.bango.driver.panel.LoginDialog;
import spm.domain.model.refdata.DomainAgentBuilder;

import static org.hamcrest.MatcherAssert.assertThat;
import static sonique.bango.matcher.IsDisplayed.isDisplayed;
import static sonique.datafixtures.PrimitiveDataFixtures.someString;
import static util.SupermanDataFixtures.someAgent;

@RunWith(SpecRunner.class)
public abstract class BangoYatspecTest extends OncePerSuiteBangoTest implements WithTestState {

    private TestState testState = new TestState();
    protected SupermanApp supermanApp;
    protected DomainAgent agentForTest;

    protected DomainAgent agentForTest() {
        return new DomainAgentBuilder().with(Role.ROLE_USER).withFirstName(someString()).withLastName("A").withPassword("a").build();
    }

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
        loginDialog.username().enter(agentForTest.getAgentCode());
        loginDialog.password().enter("a");

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