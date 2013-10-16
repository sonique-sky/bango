package sonique.bango.scenario;

import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.refdata.ServiceTypeCode;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblemBuilder;
import sky.sns.spm.domain.model.serviceproblem.DomainWorkItemBuilder;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.app.ScenarioDriver;
import sonique.bango.service.SearchApiService;
import sonique.bango.service.ServiceProblemApiService;
import spm.domain.QueueName;
import spm.domain.model.refdata.QueueBuilder;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;
import static org.mockito.Mockito.when;
import static sonique.datafixtures.PrimitiveDataFixtures.someString;
import static util.SupermanDataFixtures.*;

public class ServiceProblemScenario extends SupermanScenario {

    public static DomainServiceProblemBuilder serviceProblemWithWorkItem() {
        return serviceProblemBuilder().withWorkItem(DomainWorkItemBuilder.withAllDefaults().build());
    }

    public static DomainServiceProblemBuilder serviceProblemBuilder() {
        ServiceTypeCode serviceTypeCode = someServiceType();
        return new DomainServiceProblemBuilder()
                .withServiceProblemId(someServiceProblemId())
                .withQueue(new QueueBuilder().with(new QueueName("Queue")).build())
                .withDirectoryNumber(someDirectoryNumber())
                .withPreferredContactName(someContactName().asString())
                .withPreferredContactNumber(someTelephoneNumber().asString())
                .withServiceId(someSnsServiceId())
                .withOperatorAccountNumber(someString())
                .withOperatorReference(someOperatorReference())
                .withServiceType(serviceTypeCode)
                .withProblem(someProblemCategoryFor(serviceTypeCode))
                ;
    }

    private final DomainServiceProblem serviceProblem;

    public ServiceProblemScenario(ScenarioDriver scenarioDriver, DomainAgent agent, DomainServiceProblem serviceProblem) {
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
        when(serviceProblemApiService.serviceProblemWithId(serviceProblem.serviceProblemId())).thenReturn(serviceProblem);

        when(serviceProblemApiService.pull(serviceProblem.serviceProblemId())).thenAnswer(new Answer<List<DomainServiceProblem>>() {
            @Override
            public List<DomainServiceProblem> answer(InvocationOnMock invocationOnMock) throws Throwable {
                serviceProblem.tug(agent);
                return newArrayList(serviceProblem);
            }
        });
    }
}
