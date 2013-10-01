package sonique.bango.privilege;

import com.googlecode.yatspec.state.givenwhenthen.ActionUnderTest;
import org.junit.Ignore;
import org.junit.Test;
import sonique.bango.BangoYatspecTest;
import sonique.bango.domain.Agent;

@Ignore
public class QueueControllerPrivilegeTest extends BangoYatspecTest {

    @Test
    public void myQueuesPanelIsNotDisplayed() throws Exception {
//        given(aQueueController());

//        when(theQueueControllerLogsOn());

//        then(theMyQueuesPanel(), isNotDisplayed());
    }

    private ActionUnderTest theQueueControllerLogsOn() {
        return null;
    }

    @Test
    public void availabilityButtonIsDisabled() throws Exception {

    }

    @Test
    public void queueDashboardIsDisplayed() throws Exception {

    }

    @Override
    protected Agent agentForTest() {
        throw new UnsupportedOperationException("Method QueueControllerPrivilegeTest agentForTest() not yet implemented");
    }
}
