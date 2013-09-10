package sonique.bango.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import sonique.bango.domain.*;
import sonique.bango.store.AgentStore;
import sonique.bango.store.QueueStore;
import sonique.bango.store.ServiceProblemStore;
import sonique.bango.util.SpringSecurityAuthorisedActorProvider;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.ANY;
import static com.fasterxml.jackson.annotation.PropertyAccessor.FIELD;
import static com.google.common.collect.Lists.newArrayList;

@Configuration
@Import({SpringSecurityConfig.class})
public class BangoApplicationContext {

    private final int numberOfQueues = 30;
    private final List<Queue> queues;
    private final int serviceProblemsPerQueue = 10;

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

    @Bean
    public ServiceProblemStore serviceProblemStore() {

        Integer directoryNumber = 111;
        List<ServiceProblem> serviceProblems = newArrayList();
        for (int index = 0; index < numberOfQueues * serviceProblemsPerQueue; index++) {
            int queueId = (index / serviceProblemsPerQueue) + 1;
            directoryNumber = index % 2 == 0 ? directoryNumber : ++directoryNumber;
            serviceProblems.add(
                    new ServiceProblem(
                            index,
                            "Open",
                            new WorkItem(index + serviceProblemsPerQueue, "Unassigned"),
                            queueStore().queueById(queueId),
                            index % 2 == 0,
                            directoryNumber.toString(),
                            historyItems(index)
                    )
            );
        }
        return new ServiceProblemStore(serviceProblems);
    }

    @Bean
    public SpringSecurityAuthorisedActorProvider springSecurityAuthorisedActorProvider() {
        return new SpringSecurityAuthorisedActorProvider(agentStore());
    }

    private List<EventHistoryItem> historyItems(int index) {
        List<EventHistoryItem> historyItems = newArrayList();
        Date today = new Date();
        for (int i = 1; i < 11; i++) {
            historyItems.add(new EventHistoryItem(uniqueString("EventType", index, i), uniqueString("Notes Notes Notes Notes Notes Notes", index, i), uniqueDate(today, i), uniqueString("By", index, i)));
        }
        return historyItems;
    }

    private Date uniqueDate(Date today, int index) {
        return new Date(today.getTime() - index * 24 * 60 * 60 * 1000);
    }

    private String uniqueString(String prefix, int index1, int index2) {
        return String.format("%s-%d-%d", prefix, index1, index2);
    }
}
