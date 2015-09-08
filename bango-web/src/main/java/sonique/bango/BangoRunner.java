package sonique.bango;

import org.apache.catalina.Context;
import org.apache.catalina.LifecycleException;
import org.apache.catalina.startup.Tomcat;
import org.mockito.internal.util.collections.Sets;
import org.springframework.web.SpringServletContainerInitializer;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.DomainTeam;
import sky.sns.spm.domain.model.refdata.AgentDetails;
import sky.sns.spm.domain.model.refdata.Role;
import sky.sns.spm.domain.model.refdata.TeamBuilder;
import sky.sns.spm.infrastructure.repository.DomainAgentRepository;
import sky.sns.spm.infrastructure.repository.QueueRepository;
import sonique.bango.springconfig.SecurityConfigInitializer;
import sonique.bango.springconfig.WebConfigInitializer;
import sonique.bango.store.AgentStore;
import sonique.bango.store.QueueStore;
import spm.domain.TeamName;

import javax.servlet.ServletContext;

import static java.util.Objects.isNull;
import static util.SupermanDataFixtures.someTeamId;

public final class BangoRunner {

    private final Tomcat tomcat;
    private final int port;

    public BangoRunner() {
        this(8080);
    }

    public BangoRunner(final int port) {
        this.port = port;
        this.tomcat = new Tomcat();
    }

    public static void main(String[] args) {
        new BangoRunner().start();
    }

    public void start() {
        tomcat.setPort(port);

        String userDir = System.getProperty("user.dir");
        tomcat.setBaseDir(userDir + "bango-web/target/tomcat");
        Context context = tomcat.addContext("/superman", userDir);
        context.addServletContainerInitializer(
                new SpringServletContainerInitializer(),
                Sets.newSet(WebConfigInitializer.class, SecurityConfigInitializer.class)
        );
        context.addMimeMapping("css", "text/css");
        context.addMimeMapping("js", "application/javascript");
        context.addMimeMapping("map", "application/json");
        context.addMimeMapping("png", "image/png");
        context.addMimeMapping("jpg", "image/jpeg");
        try {
            tomcat.start();
            registerAgents(context.getServletContext());

            tomcat.getServer().await();
        } catch (LifecycleException e) {
            throw new RuntimeException("BangoRunner failed to start", e);
        }
    }


    public void stop() {
        try {
            tomcat.stop();
        } catch (LifecycleException e) {
            throw new RuntimeException("Failed to stop Bango Runner", e);
        }
    }

    private void registerAgents(ServletContext servletContext) {
        WebApplicationContext springContext = WebApplicationContextUtils.getWebApplicationContext(servletContext);
        if (isNull(springContext)) {
            throw new RuntimeException("failed to register agents, app not started correctly!");
        }

        AgentStore agentStore = (AgentStore) springContext.getBean(DomainAgentRepository.class);
        QueueStore queueStore = (QueueStore) springContext.getBean(QueueRepository.class);

        DomainTeam aTeam = new TeamBuilder().with(someTeamId()).with(new TeamName("A Team")).withAssignedQueues(queueStore.getAllQueues()).build();
        DomainTeam bTeam = new TeamBuilder().with(someTeamId()).with(new TeamName("B Team")).withAssignedQueues(queueStore.getAllQueues()).build();
        agentStore.registerAgent(new DomainAgent("q.q", "Q.Q", new AgentDetails("Quentin", "Quinn", 1, 1), Role.ROLE_QUEUE_CONTROLLER, null));
        agentStore.registerAgent(new DomainAgent("q", "Q", new AgentDetails("Queenie", "Quaffins", 1, 1), Role.ROLE_QUEUE_CONTROLLER, null));
        agentStore.registerAgent(new DomainAgent("a", "A", new AgentDetails("Arnie", "Adams", 1, 1), Role.ROLE_USER, aTeam));
        agentStore.registerAgent(new DomainAgent("b.b", "B.B", new AgentDetails("Barry", "Brown", 1, 1), Role.ROLE_USER, bTeam));
        agentStore.registerAgent(new DomainAgent("c", "C", new AgentDetails("Colin", "Carp", 1, 1), Role.ROLE_USER, bTeam));
        agentStore.registerAgent(new DomainAgent("r", "R", new AgentDetails("Randy", "Russel", 1, 1), Role.ROLE_USER, bTeam));
        agentStore.registerAgent(new DomainAgent("z", "Z", new AgentDetails("Zebedee", "Zulu", 1, 1), Role.ROLE_USER, bTeam));
    }
}
