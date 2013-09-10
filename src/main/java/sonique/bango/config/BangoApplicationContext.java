package sonique.bango.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import sonique.bango.domain.Agent;
import sonique.bango.domain.Queue;
import sonique.bango.store.AgentStore;
import sonique.bango.store.QueueStore;

import java.text.SimpleDateFormat;
import java.util.List;

import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.ANY;
import static com.fasterxml.jackson.annotation.PropertyAccessor.FIELD;
import static com.google.common.collect.Lists.newArrayList;

@Configuration
@Import({SpringSecurityConfig.class})
public class BangoApplicationContext {

    private final int numberOfQueues = 30;
    private final List<Queue> queues;

    public BangoApplicationContext() {
        queues = newArrayList();
        for (int i = 1; i <= numberOfQueues; i++) {
            queues.add(new Queue(i, "Queue " + i));
        }
    }

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setVisibility(FIELD, ANY);
        objectMapper.setDateFormat(new SimpleDateFormat("dd/MM/yyyy HH:mm"));

        return objectMapper;
    }

    @Bean
    public AgentStore agentStore() {
        AgentStore agentStore = new AgentStore();
        agentStore.registerAgent(new Agent("A.A", queues));
        agentStore.registerAgent(new Agent("B.B", queues));
        agentStore.registerAgent(new Agent("C.C", queues));

        return agentStore;
    }

    @Bean
    public QueueStore queueStore() {
        return new QueueStore(queues);
    }
}
