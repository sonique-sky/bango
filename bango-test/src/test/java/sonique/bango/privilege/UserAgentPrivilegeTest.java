package sonique.bango.privilege;

import com.googlecode.yatspec.state.givenwhenthen.ActionUnderTest;
import com.googlecode.yatspec.state.givenwhenthen.StateExtractor;
import org.junit.Ignore;
import org.junit.Test;
import sonique.bango.BangoYatspecTest;
import sonique.bango.domain.Agent;

@Ignore
public class UserAgentPrivilegeTest extends BangoYatspecTest {


    @Test
    public void myQueuesPanelIsDisplayedWithAssignedQueues() throws Exception {
//        given(anAgent());

//        when(theAgentLogsOn());

//        then(theMyQueuesPanel(), isDisplayed());
    }

    private StateExtractor<Object> theMyQueuesPanel() {
        return null;
    }

    private ActionUnderTest theAgentLogsOn() {
        return null;
    }

    @Test
    public void availabilityButtonIsEnabled() throws Exception {

    }

    @Test
    public void queueDashboardIsNotDisplayed() throws Exception {

    }

    @Override
    protected Agent agentForTest() {
        throw new UnsupportedOperationException("Method UserAgentPrivilegeTest agentForTest() not yet implemented");
    }
}
