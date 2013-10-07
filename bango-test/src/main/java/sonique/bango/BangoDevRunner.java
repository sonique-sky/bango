package sonique.bango;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.WebAppContext;
import org.springframework.context.ApplicationContext;
import sky.sns.spm.domain.model.DomainTeam;
import sky.sns.spm.domain.model.refdata.Role;
import sky.sns.spm.domain.model.refdata.TeamBuilder;
import sky.sns.spm.infrastructure.repository.DomainAgentRepository;
import sky.sns.spm.infrastructure.repository.QueueRepository;
import sonique.bango.store.AgentStore;
import sonique.bango.store.QueueStore;
import spm.domain.TeamName;
import spm.domain.model.refdata.DomainAgentBuilder;

import static org.springframework.web.context.WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE;

public class BangoDevRunner {

    private final WebAppContext context;

    public BangoDevRunner() throws Exception {
        Server server = new Server(8080);

        context = new WebAppContext();
        context.setDescriptor("bango-web/src/main/webapp/WEB-INF/web.xml");
        context.setResourceBase("bango-js/src/main/javascript");
        context.setContextPath("/superman");
        context.setParentLoaderPriority(true);

        server.setHandler(context);

        server.start();

        AgentStore agentStore = (AgentStore) get(DomainAgentRepository.class, "agentRepository");
        QueueStore queueStore = (QueueStore) get(QueueRepository.class, "queueRepository");
        registerAgentsWith(agentStore, queueStore);

        server.join();
    }

    private void registerAgentsWith(AgentStore agentStore, QueueStore queueStore) {
        DomainTeam team = new TeamBuilder().with(new TeamName("A Team")).withAssignedQueues(queueStore.getAllQueues()).build();
        agentStore.registerAgent(new DomainAgentBuilder().with(Role.ROLE_USER).withFirstName("A").withLastName("A").withPassword("a").withTeam(team).build());
        agentStore.registerAgent(new DomainAgentBuilder().with(Role.ROLE_QUEUE_CONTROLLER).withFirstName("Q").withLastName("Q").withPassword("a").build());
    }

    public static void main(String[] args) throws Exception {
        new BangoDevRunner();
    }

    private <T> T get(Class<T> clazz, String beanName) {
        return ((ApplicationContext) context.getServletHandler().getServletContext().getAttribute(ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE)).getBean(beanName, clazz);
    }
}