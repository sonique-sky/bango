package sonique.bango.scenario;

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
import spm.domain.ServiceProblemId;
import spm.domain.model.refdata.QueueBuilder;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.when;
import static sonique.datafixtures.PrimitiveDataFixtures.someString;
import static util.SupermanDataFixtures.*;

public class ServiceProblemScenario extends SupermanScenario {

    private final List<ScenarioStep> steps = newArrayList();

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
        super(scenarioDriver.servicesFor(agent));
        this.serviceProblem = serviceProblem;
    }

    public ServiceProblemScenario returnsWhenPulled(final DomainServiceProblem returnedServiceProblem) {
        steps.add(new ScenarioStep() {
            @Override
            public void doStep() {
                when(services.serviceProblemApiService().pull(any(ServiceProblemId.class))).thenReturn(newArrayList(returnedServiceProblem));
            }
        });
        return this;
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

        for (ScenarioStep step : steps) {
            step.doStep();
        }
    }

    private interface ScenarioStep {
        void doStep();
    }
}