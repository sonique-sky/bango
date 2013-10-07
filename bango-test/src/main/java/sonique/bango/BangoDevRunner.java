package sonique.bango;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.WebAppContext;
import org.springframework.context.ApplicationContext;
import sky.sns.spm.domain.model.refdata.Role;
import sky.sns.spm.infrastructure.repository.DomainAgentRepository;
import sonique.bango.store.AgentStore;
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
        registerAgentsWith(agentStore);

        server.join();
    }

    private void registerAgentsWith(AgentStore agentStore) {
        agentStore.registerAgent(new DomainAgentBuilder().with(Role.ROLE_USER).withFirstName("A").withLastName("A").withPassword("a").build());
    }

    public static void main(String[] args) throws Exception {
        new BangoDevRunner();
    }

    private <T> T get(Class<T> clazz, String beanName) {
        return ((ApplicationContext) context.getServletHandler().getServletContext().getAttribute(ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE)).getBean(beanName, clazz);
    }
}