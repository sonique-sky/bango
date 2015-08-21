package sonique.bango.springconfig;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.introspect.VisibilityChecker;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.DomainTeam;
import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.refdata.Queue;
import sky.sns.spm.domain.model.refdata.Role;
import sky.sns.spm.domain.model.refdata.ServiceType;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.serviceproblem.WorkItemAction;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReport;
import sky.sns.spm.infrastructure.repository.*;
import sky.sns.spm.infrastructure.security.SpringSecurityAuthorisedActorProvider;
import sky.sns.spm.validation.SpmCodeAndMessage;
import sonique.bango.json.*;
import sonique.bango.service.*;
import sonique.bango.service.stub.*;
import sonique.bango.store.*;

import java.io.IOException;
import java.text.SimpleDateFormat;

import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.ANY;
import static com.fasterxml.jackson.annotation.PropertyAccessor.FIELD;

@Configuration
public class BangoApplicationContext {

    protected final DomainAgentRepository agentRepository;
    private final DomainServiceProblemRepository serviceProblemRepository;
    private final QueueRepository queueRepository;
    private final DomainTroubleReportRepository troubleReportRepository;
    private final DomainTeamRepository teamRepository;

    public BangoApplicationContext() {
        agentRepository = new AgentStore();
        queueRepository = new QueueStore();
        serviceProblemRepository = new ServiceProblemStore(queueRepository);
        troubleReportRepository = new TroubleReportStore(agentRepository.getAllAgents(), serviceProblemRepository);
        teamRepository = new TeamStore();
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
        objectMapper.setDateFormat(new SimpleDateFormat("dd/MM/yyyy HH:mm:ss"));

        SimpleModule module = new SimpleModule("BangoModule");
        module.addSerializer(Role.class, new RoleSerializer());
        module.addSerializer(ServiceType.class, new ServiceTypeSerializer());
        module.addSerializer(DomainTeam.class, new TeamSerializer());
        module.addDeserializer(DomainTeam.class, new TeamDeserializer());
        module.addSerializer(EventHistoryItem.class, new EventHistoryItemSerializer());
        module.addSerializer(DomainServiceProblem.class, new ServiceProblemSerializer());
        module.addSerializer(DomainTroubleReport.class, new TroubleReportSerializer());
        module.addSerializer(DomainAgent.class, new AgentSerializer());
        module.addSerializer(WorkItemAction.class, new WorkItemActionSerializer());
        module.addSerializer(Queue.class, new QueueSerializer());

        module.addSerializer(SpmCodeAndMessage.class, new SpmCodeAndMessageSerializer());
        objectMapper.registerModule(module);

        return objectMapper;
    }

    @Bean
    public DomainAgentRepository agentRepository() {
        return agentRepository;
    }

    @Bean
    public QueueRepository queueRepository() {
        return queueRepository;
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
        return new StubQueueApiService(queueRepository(), serviceProblemRepository, springSecurityAuthorisedActorProvider());
    }

    @Bean
    public SearchApiService searchApiService() {
        return new StubSearchApiService(serviceProblemRepository);
    }

    @Bean
    public TeamApiService teamApiService() {
        return new StubTeamApiService(teamRepository);
    }

    @Bean
    public ServiceProblemApiService serviceProblemApiService() {
        return new StubServiceProblemApiService(serviceProblemRepository, springSecurityAuthorisedActorProvider());
    }

    @Bean
    public TroubleReportApiService troubleReportApiService() {
        return new StubTroubleReportApiService(troubleReportRepository);
    }
}
