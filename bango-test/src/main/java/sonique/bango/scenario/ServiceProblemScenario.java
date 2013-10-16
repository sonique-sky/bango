package sonique.bango.scenario;

import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblemBuilder;
import sky.sns.spm.domain.model.serviceproblem.DomainWorkItemBuilder;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.app.ScenarioDriver;
import sonique.bango.service.SearchApiService;
import sonique.bango.service.ServiceProblemApiService;
import spm.domain.QueueName;
import spm.domain.ServiceProblemId;
import spm.domain.model.refdata.QueueBuilder;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;
import static org.mockito.Mockito.when;
import static sonique.datafixtures.DateTimeDataFixtures.someDateInTheNextYear;
import static sonique.datafixtures.PrimitiveDataFixtures.someString;
import static util.SupermanDataFixtures.*;

public class ServiceProblemScenario extends SupermanScenario {

    public static ServiceProblemScenario noWorkItemScenario(ScenarioDriver scenarioDriver, DomainAgent agent) {
        DomainServiceProblem serviceProblem = serviceProblemBuilder()
                .withNoWorkItem()
                .build();
        return new ServiceProblemScenario(scenarioDriver, agent, serviceProblem);
    }

    public static ServiceProblemScenario serviceProblemScenario(ScenarioDriver scenarioDriver, DomainAgent agent) {
        DomainServiceProblem serviceProblem = serviceProblemWithWorkItem().build();
        return new ServiceProblemScenario(scenarioDriver, agent, serviceProblem);
    }

    public static ServiceProblemScenario assignedServiceProblemScenario(ScenarioDriver scenarioDriver, DomainAgent agent) {
        DomainServiceProblem serviceProblem = serviceProblemWithWorkItem().withAssignedAgent(agent).build();
        return new ServiceProblemScenario(scenarioDriver, agent, serviceProblem);
    }

    public static ServiceProblemScenario serviceProblemWithReminderScenario(ScenarioDriver scenarioDriver, DomainAgent agent) {
        DomainServiceProblem serviceProblem = serviceProblemBuilder()
                .withWorkItem(DomainWorkItemBuilder.withAllDefaults().withWorkReminder(someDateInTheNextYear().toDate()).build())
                .build();

        return new ServiceProblemScenario(scenarioDriver, agent, serviceProblem);
    }

    private static DomainServiceProblemBuilder serviceProblemWithWorkItem() {
        return serviceProblemBuilder().withWorkItem(DomainWorkItemBuilder.withAllDefaults().build());
    }

    private static DomainServiceProblemBuilder serviceProblemBuilder() {
        return new DomainServiceProblemBuilder()
                .withServiceProblemId(someServiceProblemId())
                .withQueue(new QueueBuilder().with(new QueueName("Queue")).build())
                .withDirectoryNumber(someDirectoryNumber())
                .withPreferredContactName(someContactName().asString())
                .withPreferredContactNumber(someTelephoneNumber().asString())
                .withServiceId(someSnsServiceId())
                .withOperatorAccountNumber(someString())
                ;
    }

    private final DomainServiceProblem serviceProblem;

    private ServiceProblemScenario(ScenarioDriver scenarioDriver, DomainAgent agent, DomainServiceProblem serviceProblem) {
        super(scenarioDriver, agent);
        this.serviceProblem = serviceProblem;
    }

    @Override
    public void bindScenario() {
        PagedSearchResults<DomainServiceProblem> serviceProblems = new PagedSearchResults<DomainServiceProblem>(newArrayList(serviceProblem), 1L);

        SearchApiService searchApiService = services.searchApiService();

        when(searchApiService.serviceProblemById(serviceProblem.serviceProblemId())).thenReturn(serviceProblems);
        when(searchApiService.serviceProblemByDirectoryNumber(serviceProblem.getDirectoryNumber())).thenReturn(serviceProblems);
        when(searchApiService.serviceProblemsByServiceId(serviceProblem.serviceId())).thenReturn(serviceProblems);

        ServiceProblemApiService serviceProblemApiService = services.serviceProblemApiService();

        when(serviceProblemApiService.pull(serviceProblem.serviceProblemId())).thenAnswer(new Answer<List<DomainServiceProblem>>() {
            @Override
            public List<DomainServiceProblem> answer(InvocationOnMock invocationOnMock) throws Throwable {
                serviceProblem.tug(agent);
                return newArrayList(serviceProblem);
            }
        });
    }

    public DomainServiceProblem serviceProblem() {
        return serviceProblem;
    }

    public ServiceProblemId serviceProblemId() {
        return serviceProblem.serviceProblemId();
    }
}
