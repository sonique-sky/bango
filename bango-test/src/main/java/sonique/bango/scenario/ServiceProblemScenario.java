package sonique.bango.scenario;

import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.refdata.PresentedServiceType;
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
        PresentedServiceType serviceTypeCode = somePresentedServiceType();
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
                .withProblem(someProblemCategoryFor(serviceTypeCode));
    }

    private final DomainServiceProblem serviceProblem;

    public ServiceProblemScenario(ScenarioDriver scenarioDriver, DomainAgent agent, DomainServiceProblem serviceProblem) {
        super(scenarioDriver.servicesFor(agent));
        this.serviceProblem = serviceProblem;
    }

    public ServiceProblemScenario returnsWhenPulled(final DomainServiceProblem returnedServiceProblem) {
        return addStep(() -> when(services.serviceProblemApiService().pull(any(ServiceProblemId.class))).thenReturn(returnedServiceProblem));
    }

    public ServiceProblemScenario returnsWhenNoteAdded(final EventHistoryItem expectedEventHistoryItem) {
        return addStep(() -> when(services.serviceProblemApiService().addNote(any(ServiceProblemId.class), any(String.class))).thenReturn(expectedEventHistoryItem));
    }

    public ServiceProblemScenario returnsEventHistoryRefreshed(final List<EventHistoryItem> expectedEventHistoryItems) {
        return addStep(() -> when(services.serviceProblemApiService().eventHistory(any(ServiceProblemId.class))).thenReturn(expectedEventHistoryItems));
    }

    private ServiceProblemScenario addStep(ScenarioStep scenarioStep) {
        steps.add(scenarioStep);
        return this;
    }

    @Override
    public void bindScenario() {
        PagedSearchResults<DomainServiceProblem> serviceProblems = new PagedSearchResults<>(newArrayList(serviceProblem), 1L);

        SearchApiService searchApiService = services.searchApiService();

        when(searchApiService.serviceProblemById(serviceProblem.serviceProblemId())).thenReturn(serviceProblems);
        when(searchApiService.serviceProblemByDirectoryNumber(serviceProblem.getDirectoryNumber())).thenReturn(serviceProblems);
        when(searchApiService.serviceProblemsByServiceId(serviceProblem.serviceId(), 0, 20)).thenReturn(serviceProblems);

        ServiceProblemApiService serviceProblemApiService = services.serviceProblemApiService();
        when(serviceProblemApiService.serviceProblemWithId(serviceProblem.serviceProblemId())).thenReturn(serviceProblem);
        when(serviceProblemApiService.eventHistory(serviceProblem.serviceProblemId())).thenReturn(serviceProblem.historyItems());

        steps.forEach(ServiceProblemScenario.ScenarioStep::doStep);
    }

    private interface ScenarioStep {
        void doStep();
    }
}