package sonique.bango.driver;

import sonique.bango.Bango;
import sonique.bango.domain.Agent;
import sonique.bango.domain.Queue;
import sonique.bango.driver.panel.LoginWindow;
import sonique.bango.store.AgentStore;
import sonique.bango.store.QueueStore;
import sonique.bango.store.ServiceProblemStore;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;
import static org.mockito.Mockito.mock;

public class SupermanApp {
    private final SupermanWebDriver driver;
    private final AgentStore agentStore = new AgentStore();
    private List<Queue> queues;

    public SupermanApp() {
        driver = new SupermanWebDriver("http://localhost:8080/superman");
        queues = newArrayList();
        new Bango(new QueueStore(queues), agentStore, mock(ServiceProblemStore.class));
    }

    public LoginWindow loginWindow() {
        return new LoginWindow(driver);
    }

    public void with(Agent agent) {
        agentStore.registerAgent(agent);
    }
}
