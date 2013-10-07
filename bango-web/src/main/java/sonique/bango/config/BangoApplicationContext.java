package sonique.bango.config;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.introspect.VisibilityChecker;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.refdata.Queue;
import sky.sns.spm.domain.model.refdata.Role;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.infrastructure.repository.DomainAgentRepository;
import sky.sns.spm.infrastructure.repository.DomainServiceProblemRepository;
import sky.sns.spm.infrastructure.repository.QueueRepository;
import sky.sns.spm.infrastructure.security.SpringSecurityAuthorisedActorProvider;
import sonique.bango.json.EventHistoryItemSerializer;
import sonique.bango.json.QueueSerializer;
import sonique.bango.json.RoleSerializer;
import sonique.bango.json.ServiceProblemSerializer;
import sonique.bango.service.AgentApiService;
import sonique.bango.service.QueueApiService;
import sonique.bango.service.SearchApiService;
import sonique.bango.service.ServiceProblemApiService;
import sonique.bango.service.stub.StubAgentApiService;
import sonique.bango.service.stub.StubQueueApiService;
import sonique.bango.service.stub.StubSearchApiService;
import sonique.bango.service.stub.StubServiceProblemApiService;
import sonique.bango.store.AgentStore;
import sonique.bango.store.QueueStore;
import sonique.bango.store.ServiceProblemStore;

import java.io.IOException;
import java.text.SimpleDateFormat;

import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.ANY;
import static com.fasterxml.jackson.annotation.PropertyAccessor.FIELD;

@Configuration
@Import({SpringSecurityConfig.class})
public class BangoApplicationContext {

    protected final DomainAgentRepository agentRepository;
    private final DomainServiceProblemRepository serviceProblemRepository;
    private final QueueRepository queueRepository;

    public BangoApplicationContext() {
        agentRepository = new AgentStore();
        queueRepository = new QueueStore();
        serviceProblemRepository = new ServiceProblemStore(queueRepository);
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
        objectMapper.setVisibilityChecker(VisibilityChecker.Std.defaultInstance().withFieldVisibility(JsonAutoDetect.Visibility.ANY));
        objectMapper.setDateFormat(new SimpleDateFormat("dd/MM/yyyy HH:mm"));

        SimpleModule module = new SimpleModule("BangoModule");
        module.addSerializer(Role.class, new RoleSerializer());
        module.addSerializer(EventHistoryItem.class, new EventHistoryItemSerializer());
        module.addSerializer(DomainServiceProblem.class, new ServiceProblemSerializer());
        module.addSerializer(Queue.class, new QueueSerializer());

        objectMapper.registerModule(module);

        return objectMapper;
    }

    @Bean
    public DomainAgentRepository agentRepository() {
        return agentRepository;
    }

    @Bean
    public SpringSecurityAuthorisedActorProvider springSecurityAuthorisedActorProvider() {
        return new SpringSecurityAuthorisedActorProvider(agentRepository);
    }

    @Bean
    public AgentApiService agentApiService() {
        return new StubAgentApiService(springSecurityAuthorisedActorProvider(), serviceProblemRepository);
    }

    @Bean
    public QueueApiService queueApiService() {
        return new StubQueueApiService(queueRepository, serviceProblemRepository, springSecurityAuthorisedActorProvider());
    }

    @Bean
    public SearchApiService searchApiService() {
        return new StubSearchApiService(serviceProblemRepository);
    }

    @Bean
    public ServiceProblemApiService serviceProblemApiService() {
        return new StubServiceProblemApiService(serviceProblemRepository, springSecurityAuthorisedActorProvider());
    }
}
