package sonique.bango.config;

import com.google.common.collect.Lists;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import sonique.bango.domain.Agent;
import sonique.bango.domain.Queue;
import sonique.bango.store.AgentStore;

import static sonique.bango.domain.Role.ROLE_QUEUE_CONTROLLER;
import static sonique.bango.domain.Role.ROLE_USER;

@Configuration
public class TestContext extends BangoApplicationContext {


    @Bean
    public AgentStore agentStore() {
        AgentStore agentStore = new AgentStore();
        agentStore.registerAgent(new Agent("A.A", Lists.<Queue>newArrayList(), ROLE_USER));
        agentStore.registerAgent(new Agent("Q.Q", Lists.<Queue>newArrayList(), ROLE_QUEUE_CONTROLLER));

        return agentStore;
    }
}
