package sonique.bango;

import com.googlecode.yatspec.junit.SpecRunner;
import com.googlecode.yatspec.state.givenwhenthen.*;
import org.hamcrest.Matcher;
import org.junit.After;
import org.junit.Before;
import org.junit.runner.RunWith;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.refdata.AgentDetails;
import sky.sns.spm.domain.model.refdata.Role;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sonique.bango.action.LoginAction;
import sonique.bango.app.ScenarioDriver;
import sonique.bango.app.SupermanApp;
import sonique.bango.driver.component.tab.SupermanTab;
import sonique.bango.driver.panel.navigation.AgentStatusPanel;
import sonique.bango.driver.panel.navigation.HeaderPanel;
import sonique.bango.driver.panel.navigation.MyQueuesPanel;
import sonique.bango.driver.panel.serviceproblem.WorkItemPanel;
import sonique.bango.scenario.ScenarioGivensBuilder;
import sonique.bango.scenario.ServiceProblemScenario;

@RunWith(SpecRunner.class)
public abstract class BangoYatspecTest extends OncePerSuiteBangoTest implements WithTestState {

    private final TestState testState = new TestState();
    protected SupermanApp supermanApp;
    protected DomainAgent agentForTest;

    protected DomainAgent agentForTest() {
        return new DomainAgent("q.q", "Q.Q", new AgentDetails("q", "q"), Role.ROLE_USER, null);
    }

    @Before
    public void beforeTest() throws Exception {
        supermanApp = bangoTestEnvironment.borrowSupermanApp();
        agentForTest = agentForTest();

        scenarioDriver().registerAgent(agentForTest);
        testState.interestingGivens.add("Agent", agentForTest);
    }

    @After
    public void afterTest() throws Exception {
        HeaderPanel headerPanel = supermanApp.appContainer().headerPanel();
        if (headerPanel.isDisplayed()) {
            headerPanel.logout();
        }
        bangoTestEnvironment.releaseSupermanApp(supermanApp);
        scenarioDriver().deRegisterAgent(agentForTest);
    }

    @Override
    public TestState testState() {
        return testState;
    }

    protected void loginAgent() {
        new LoginAction(supermanApp, agentForTest, "q").goBango();
    }

    protected ScenarioDriver scenarioDriver() {
        return bangoTestEnvironment.scenarioDriver();
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

    public TestState and(ActionUnderTest actionUndertest) throws Exception {
        return when(actionUndertest);
    }

    public <ItemOfInterest> TestState then(StateExtractor<ItemOfInterest> extractor, Matcher<? super ItemOfInterest> matcher) throws Exception {
        return testState.then(extractor, matcher);
    }

    public <ItemOfInterest> TestState and(StateExtractor<ItemOfInterest> stateExtractor, Matcher<? super ItemOfInterest> matcher) throws Exception {
        return then(stateExtractor, matcher);
    }

    protected ScenarioGivensBuilder scenarioGivensBuilderFor(DomainServiceProblem serviceProblem) {
        return new ScenarioGivensBuilder(new ServiceProblemScenario(scenarioDriver(), agentForTest, serviceProblem));
    }

    protected StateExtractor<SupermanTab> theQueueDashboardTab() {
        return inputAndOutputs -> supermanApp.appContainer().tab().queueDashboard();
    }

    protected StateExtractor<SupermanTab> theAgentDashboardTab() {
        return inputAndOutputs -> supermanApp.appContainer().tab().agentDashboard();
    }

    protected StateExtractor<SupermanTab> theMspDashboardTab() {
        return inputAndOutputs -> supermanApp.appContainer().tab().mspDashboard();
    }

    protected StateExtractor<SupermanTab> theAdminDashboardTab() {
        return inputAndOutputs -> supermanApp.appContainer().tab().adminDashboard();
    }

    protected StateExtractor<AgentStatusPanel> theAgentStatusPanel() {
        return capturedInputAndOutputs -> supermanApp.appContainer().agentStatusPanel();
    }

    protected StateExtractor<MyQueuesPanel> theMyQueuesPanel() {
        return capturedInputAndOutputs -> supermanApp.appContainer().myQueuesPanel();
    }

    protected StateExtractor<WorkItemPanel> theWorkItemPanelFor(final DomainServiceProblem theServiceProblem) {
        return inputAndOutputs -> supermanApp.appContainer().tab().serviceProblem(theServiceProblem).tabContent().workItemPanel();
    }
}