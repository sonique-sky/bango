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
import sky.sns.spm.web.spmapp.shared.dto.LineTestSummaryDTO;
import sonique.bango.domain.troublereport.ReserveAppointment;
import sonique.bango.domain.troublereport.TroubleReportTemplate;
import sonique.bango.domain.troublereport.TroubleReportTemplateFactory;
import sonique.bango.json.*;
import sonique.bango.service.*;
import sonique.bango.service.stub.*;
import sonique.bango.store.*;
import sonique.types.NumberValue;
import sonique.types.StringValue;
import spm.domain.ExceptionThrowingErrorReporter;
import spm.troublereport.ManualTroubleReportRaiser;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;

import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.ANY;
import static com.fasterxml.jackson.annotation.PropertyAccessor.FIELD;

@Configuration
public class BangoApplicationContext {

    protected final DomainAgentRepository agentRepository;
    private final DomainServiceProblemRepository serviceProblemRepository;
    private final QueueRepository queueRepository;
    private final DomainTroubleReportRepository troubleReportRepository;
    private final DomainTeamRepository teamRepository;
    private final SymptomStore symptomRepository;
    private final DomainProblemCategoryRepository problemCategoryRepository;
    private final DomainMajorServiceProblemRepository mspRepository;

    public BangoApplicationContext() {
        agentRepository = new AgentStore();
        queueRepository = new QueueStore();
        problemCategoryRepository = new ProblemCategoryStore();
        symptomRepository = new SymptomStore();
        serviceProblemRepository = new ServiceProblemStore(queueRepository, symptomRepository);
        troubleReportRepository = new TroubleReportStore(serviceProblemRepository, symptomRepository);
        teamRepository = new TeamStore();
        mspRepository = new MspStore();
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
        objectMapper.setVisibility(VisibilityChecker.Std.defaultInstance().withFieldVisibility(JsonAutoDetect.Visibility.ANY));
        objectMapper.setDateFormat(new SimpleDateFormat("dd/MM/yyyy HH:mm:ss"));

        SimpleModule module = new SimpleModule("BangoModule");

        module.addSerializer(NumberValue.class, new NumberValueSerializer());
        module.addSerializer(StringValue.class, new StringValueSerializer());

        module.addSerializer(DomainServiceProblem.class, new ServiceProblemSerializer());
        module.addSerializer(DomainTroubleReport.class, new TroubleReportSerializer());
        module.addSerializer(EventHistoryItem.class, new EventHistoryItemSerializer());
        module.addSerializer(LineTestSummaryDTO.class, new LineTestSummaryDTOSerializer());
        module.addSerializer(Role.class, new RoleSerializer());
        module.addSerializer(ServiceType.class, new ServiceTypeSerializer());
        module.addSerializer(SpmCodeAndMessage.class, new SpmCodeAndMessageSerializer());
        module.addSerializer(TroubleReportTemplate.class, new TroubleReportTemplateSerializer());
        module.addSerializer(WorkItemAction.class, new WorkItemActionSerializer());

        module.addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer());
        module.addDeserializer(DomainTeam.class, new TeamDeserializer());
        module.addDeserializer(DomainAgent.class, new AgentDeserializer());
        module.addDeserializer(Queue.class, new QueueDeserializer());
        module.addDeserializer(ReserveAppointment.class, new ReservedAppointmentDeserializer());
        module.addDeserializer(TroubleReportTemplate.class, new TroubleReportTemplateDeserializer());
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
    public DomainProblemCategoryRepository problemCategoryRepository() {
        return problemCategoryRepository;
    }

    @Bean
    public DomainTeamRepository teamRepository() {
        return teamRepository;
    }

    @Bean
    public SpringSecurityAuthorisedActorProvider springSecurityAuthorisedActorProvider() {
        return new SpringSecurityAuthorisedActorProvider(agentRepository);
    }

    @Bean
    public AgentApiService agentApiService() {
        return new StubAgentApiService(
                springSecurityAuthorisedActorProvider(),
                serviceProblemRepository,
                agentRepository,
                teamRepository,
                queueRepository
        );
    }

    @Bean
    public QueueApiService queueApiService() {
        return new StubQueueApiService(queueRepository(), serviceProblemRepository, springSecurityAuthorisedActorProvider());
    }

    @Bean
    public ProblemCategoryApiService problemCategoryApiService() {
        return new StubProblemCategoryApiService(problemCategoryRepository());
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
        return new StubServiceProblemApiService(serviceProblemRepository, springSecurityAuthorisedActorProvider(), queueRepository, agentRepository);
    }

    @Bean
    public FaultCauseResolutionApiService faultCauseResolutionApiService() {
        return new StubFaultCauseResolutionApiService();
    }

    @Bean
    public TroubleReportApiService troubleReportApiService() {
        return new StubTroubleReportApiService(
                troubleReportRepository,
                serviceProblemRepository,
                new TroubleReportTemplateFactory(symptomRepository),
                springSecurityAuthorisedActorProvider(),
                troubleReportRaiser()
        );
    }

    @Bean
    public ApplicationConfigurationApiService configurationApiService() {
        return new StubApplicationConfigurationApiService(null);
    }

    @Bean
    public ManualTroubleReportRaiser troubleReportRaiser() {
        return new ManualTroubleReportRaiser(
                serviceProblemRepository,
                new StubTroubleReportRaiser(queueRepository, troubleReportRepository),
                new ExceptionThrowingErrorReporter()
        );
    }

    @Bean
    public LineTestApiService lineTestApiService() {
        return new StubLineTestApiService();
    }

    @Bean
    public DashboardApiService dashboardApiService() {
        return new StubDashboardApiService(queueRepository, serviceProblemRepository, agentRepository);
    }

    @Bean
    public MspApiService mspApiService() {
        return new StubMspApiService(mspRepository);
    }
}
