package sonique.bango.config;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import sonique.bango.domain.*;
import sonique.bango.json.RoleSerializer;
import sonique.bango.service.*;
import sonique.bango.service.stub.StubAgentApiService;
import sonique.bango.service.stub.StubQueueApiService;
import sonique.bango.service.stub.StubSearchApiService;
import sonique.bango.service.stub.StubServiceProblemApiService;
import sonique.bango.store.AgentStore;
import sonique.bango.store.QueueStore;
import sonique.bango.store.ServiceProblemStore;
import sonique.bango.util.SpringSecurityAuthorisedActorProvider;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.ANY;
import static com.fasterxml.jackson.annotation.PropertyAccessor.FIELD;
import static com.google.common.collect.Lists.newArrayList;
import static sonique.bango.domain.Role.ROLE_QUEUE_CONTROLLER;
import static sonique.bango.domain.Role.ROLE_USER;

@Configuration
@Import({SpringSecurityConfig.class})
public class BangoApplicationContext {

    private static final int NUMBER_OF_QUEUES = 30;
    private static final int SERVICE_PROBLEMS_PER_QUEUE = 10;

    private final AgentStore agentStore;
    private final QueueStore queueStore;
    private final ServiceProblemStore serviceProblemStore;

    public BangoApplicationContext() {
        List<Queue> queues = newArrayList();
        for (int i = 1; i <= NUMBER_OF_QUEUES; i++) {
            queues.add(new Queue(i, "Queue " + i));
        }
        this.queueStore = new QueueStore(queues);
        this.agentStore = agentStore(queues);
        this.serviceProblemStore =serviceProblemStore(queueStore);
    }

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setVisibility(FIELD, ANY);
        objectMapper.getSerializerProvider().setNullValueSerializer(new JsonSerializer<Object>() {
            @Override
            public void serialize(Object value, JsonGenerator jgen, SerializerProvider provider) throws IOException {
                jgen.writeStartObject();
                jgen.writeEndObject();
            }
        });
        objectMapper.setDateFormat(new SimpleDateFormat("dd/MM/yyyy HH:mm"));

        SimpleModule module = new SimpleModule("BangoModule");
        module.addSerializer(Role.class, new RoleSerializer());

        objectMapper.registerModule(module);

        return objectMapper;
    }

    @Bean
    public SpringSecurityAuthorisedActorProvider springSecurityAuthorisedActorProvider() {
        return new SpringSecurityAuthorisedActorProvider(agentStore);
    }

    @Bean
    public AgentApiService agentApiService() {
        return new StubAgentApiService(springSecurityAuthorisedActorProvider(), serviceProblemStore);
    }

    @Bean
    public QueueApiService queueApiService() {
        return new StubQueueApiService(queueStore, serviceProblemStore);
    }

    @Bean
    public SearchApiService searchApiService() {
        return new StubSearchApiService(serviceProblemStore);
    }

    @Bean
    public ServiceProblemApiService serviceProblemApiService() {
        return new StubServiceProblemApiService(serviceProblemStore, springSecurityAuthorisedActorProvider());
    }

    private AgentStore agentStore(List<Queue> queues) {
        AgentStore agentStore = new AgentStore();
        agentStore.registerAgent(new Agent("A.A", queues, ROLE_USER));
        agentStore.registerAgent(new Agent("B.B", queues, ROLE_USER));
        agentStore.registerAgent(new Agent("C.C", queues, ROLE_USER));
        agentStore.registerAgent(new Agent("Q.Q", queues, ROLE_QUEUE_CONTROLLER));

        return agentStore;
    }

    private ServiceProblemStore serviceProblemStore(QueueStore queueStore) {
        Integer directoryNumber = 111;
        List<ServiceProblem> serviceProblems = newArrayList();
        for (int index = 0; index < NUMBER_OF_QUEUES * SERVICE_PROBLEMS_PER_QUEUE; index++) {
            int queueId = (index / SERVICE_PROBLEMS_PER_QUEUE) + 1;
            directoryNumber = index % 2 == 0 ? directoryNumber : ++directoryNumber;
            serviceProblems.add(
                    new ServiceProblem(
                            index,
                            "Open",
                            new WorkItem(index + SERVICE_PROBLEMS_PER_QUEUE, "Unassigned"),
                            queueStore.queueById(queueId),
                            index % 2 == 0,
                            directoryNumber.toString(),
                            historyItems(index)
                    )
            );
        }
        return new ServiceProblemStore(serviceProblems);
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
