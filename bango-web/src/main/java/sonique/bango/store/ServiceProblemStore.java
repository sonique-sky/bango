package sonique.bango.store;

import com.google.common.collect.Iterables;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.majorserviceproblem.DomainMajorServiceProblem;
import sky.sns.spm.domain.model.refdata.PresentedServiceType;
import sky.sns.spm.domain.model.refdata.Queue;
import sky.sns.spm.domain.model.serviceproblem.*;
import sky.sns.spm.infrastructure.repository.DomainServiceProblemRepository;
import sky.sns.spm.infrastructure.repository.QueueRepository;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import spm.domain.*;
import spm.domain.model.refdata.DomainAgentBuilder;
import spm.messages.bt.types.DirectoryNumber;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import static com.google.common.collect.Collections2.filter;
import static com.google.common.collect.Lists.newArrayList;
import static sky.sns.spm.domain.model.serviceproblem.EventDescription.Note;
import static sonique.datafixtures.DateTimeDataFixtures.someInstantInTheLast24Hours;
import static sonique.datafixtures.PrimitiveDataFixtures.*;
import static util.SupermanDataFixtures.*;

public class ServiceProblemStore implements DomainServiceProblemRepository {

    private final List<DomainServiceProblem> serviceProblems;

    public ServiceProblemStore(QueueRepository queueStore) {
        serviceProblems = newArrayList();

        List<Queue> queues = queueStore.getAllQueues();
        Long serviceProblemId = 1L;
        for (Queue queue : queues) {
            for (int i = 0; i < 20; i++) {
                DomainWorkItem workItem = null;
                if (serviceProblemId % 2 == 0) {
                    workItem = DomainWorkItemBuilder.withAllDefaults().build();
                } else if (serviceProblemId % 3 == 0) {
                    DomainAgent agent = new DomainAgentBuilder().build();
                    workItem = DomainWorkItemBuilder.anAssignedPushWorkItem().withAgent(agent).build();
                }
                PresentedServiceType serviceTypeCode = somePresentedServiceType();
                DomainServiceProblem serviceProblem = new DomainServiceProblemBuilder()
                        .withServiceProblemId(new ServiceProblemId(serviceProblemId++))
                        .withServiceId(new SnsServiceId(serviceProblemId + 100))
                        .withDirectoryNumber(new DirectoryNumber("directoryNumber-" + (serviceProblemId % 4)))
                        .withQueue(queue)
                        .withWorkItem(workItem)
                        .withPreferredContactName(someContactName().asString())
                        .withPreferredContactNumber(someTelephoneNumber().asString())
                        .withOperatorAccountNumber(someString())
                        .withOperatorReference(someOperatorReference())
                        .withServiceType(serviceTypeCode)
                        .withProblem(someProblemCategoryFor(serviceTypeCode))
                        .build();
                serviceProblem.historyItems().add(ServiceProblemEventHistoryItem.createEvent(pickOneOf(EventDescription.class), Date.from(someInstantInTheLast24Hours()), someString(), allTheWords(), serviceProblem));
                serviceProblem.historyItems().add(ServiceProblemEventHistoryItem.createEvent(Note, Date.from(someInstantInTheLast24Hours()), someString(), someWords(), serviceProblem));
                serviceProblem.historyItems().add(ServiceProblemEventHistoryItem.createEvent(Note, Date.from(someInstantInTheLast24Hours()), someString(), someWords(), serviceProblem));
                serviceProblems.add(serviceProblem);
            }
        }
    }

    private String allTheWords() {
        return "Lorem ipsum dolor sit amet, cu audire probatus urbanitas vis, tota lobortis iudicabit vis te. Stet postea at cum. Eu justo oportere usu, magna putant accommodare mel ea, vis offendit senserit dignissim at. Imperdiet patrioque est ne, elitr adolescens pro et. Debet perfecto te quo." +
                "His ut volumus petentium mediocritatem. In ius menandri adipisci, dicat falli no mei. Vim sumo aperiam at, no laoreet indoctum quo. Nobis molestie duo te. Eu probo altera est, ne offendit qualisque has, vel at omittam pericula hendrerit." +
                "At vix nostrum corrumpit, eum prima gloriatur ex. Discere blandit voluptatibus sed ad. Ius id alia atqui inimicus, nominavi invidunt his eu. Te mei novum insolens, no eirmod interpretaris his, per ea recusabo consequat deterruisset. Has nisl nonumes ne, an vis mutat aliquando." +
                "Ius eu alia detracto torquatos, nec insolens accusamus id. Iriure utroque consequat ad cum. Aperiri dignissim scriptorem ea vim, nec ex quem convenire aliquando. Ei nisl falli possit vel, sit eu quem vocent." +
                "Nisl veniam mea ea, est expetenda euripidis in. No ius mandamus assentior. Magna vocent ad est, pro nulla ancillae nominavi id, nullam tibique ullamcorper ius no. Tempor recteque vix et, et his vidisse ancillae delicata, ne pri illud expetenda. Id sed vidit labitur appetere.";
    }

    public DomainServiceProblem findBy(final ServiceProblemId serviceProblemId) {
        return Iterables.getFirst(filter(serviceProblems, serviceProblem -> serviceProblem.serviceProblemId().equals(serviceProblemId)), null);
    }

    @Override
    public DomainServiceProblem findByServiceProblemId(ServiceProblemId serviceProblemId) {
        return findBy(serviceProblemId);
    }

    @Override
    public DomainServiceProblem findByTroubleReportId(TroubleReportId troubleReportId) {
        throw new UnsupportedOperationException("Method ServiceProblemStore findByTroubleReportId() not yet implemented");
    }

    @Override
    public DomainServiceProblem findByProviderReference(ProviderReference providerReference) {
        throw new UnsupportedOperationException("Method ServiceProblemStore findByProviderReference() not yet implemented");
    }

    @Override
    public void persist(DomainServiceProblem serviceProblem) {
        throw new UnsupportedOperationException("Method ServiceProblemStore persist() not yet implemented");
    }

    @Override
    public DomainServiceProblem nextAvailableServiceProblemFor(DomainAgent domainAgent) {
        throw new UnsupportedOperationException("Method ServiceProblemStore nextAvailableServiceProblemFor() not yet implemented");
    }

    @Override
    public Iterable<DomainServiceProblem> findServiceProblemsToAssociate(DomainMajorServiceProblem majorServiceProblem) {
        throw new UnsupportedOperationException("Method ServiceProblemStore findServiceProblemsToAssociate() not yet implemented");
    }

    @Override
    public Iterable<DomainServiceProblem> findAssociatedServiceProblems(MajorServiceProblemId majorServiceProblemId) {
        throw new UnsupportedOperationException("Method ServiceProblemStore findAssociatedServiceProblems() not yet implemented");
    }

    @Override
    public PagedSearchResults<DomainServiceProblem> searchForServiceProblemsInQueue(final SearchParametersDTO searchParameters) {
        List<DomainServiceProblem> domainServiceProblems = newArrayList(filter(serviceProblems, serviceProblem -> serviceProblem.queue().id().equals(new QueueId(searchParameters.getSearchValue())) && ServiceProblemStatus.Open.equals(serviceProblem.getStatus())));
        return new PagedSearchResults<>(domainServiceProblems, (long) domainServiceProblems.size());
    }

    @Override
    public PagedSearchResults<DomainServiceProblem> searchForServiceProblems(final SearchParametersDTO searchParameters) {
        Collection<DomainServiceProblem> filter = filterFor(searchParameters);

        return new PagedSearchResults<>(newArrayList(filter), (long) filter.size());
    }

    private Collection<DomainServiceProblem> filterFor(final SearchParametersDTO searchParameters) {
        SearchProperty searchProperty = SearchProperty.fromString(searchParameters.getSearchProperty());
        switch (searchProperty) {
            case serviceProblemId:
                return filter(serviceProblems, serviceProblem -> serviceProblem.serviceProblemId().asString().equals(searchParameters.getSearchValue()));
            case serviceId:
                return filter(serviceProblems, serviceProblem -> serviceProblem.serviceId().asString().equals(searchParameters.getSearchValue()));
            case directoryNumber:
                return filter(serviceProblems, serviceProblem -> serviceProblem.getDirectoryNumber().asString().equals(searchParameters.getSearchValue()));
            case mspId:
        }
        return null;
    }

    private enum SearchProperty {
        serviceProblemId, serviceId, directoryNumber, mspId;

        public static SearchProperty fromString(String searchPropertyAsString) {
            for (SearchProperty searchProperty : values()) {
                if (searchProperty.name().equals(searchPropertyAsString))
                    return searchProperty;
            }
            throw new IllegalArgumentException(String.format("No SearchProperty for %s", searchPropertyAsString));
        }
    }

    @Override
    public List<DomainServiceProblem> getServiceProblemThatHaveBreachedQueueSla(sky.sns.spm.domain.model.refdata.Queue queue) {
        throw new UnsupportedOperationException("Method ServiceProblemStore getServiceProblemThatHaveBreachedQueueSla() not yet implemented");
    }

    @Override
    public List<DomainServiceProblem> getServiceProblemsForAgent(final DomainAgent agent) {
        return newArrayList(filter(serviceProblems, serviceProblem -> serviceProblem.isAssignedTo(agent)));
    }

    @Override
    public List<DomainServiceProblem> getServiceProblemsThatHaveBreachedWorkReminderSla() {
        throw new UnsupportedOperationException("Method ServiceProblemStore getServiceProblemsThatHaveBreachedWorkReminderSla() not yet implemented");
    }

    @Override
    public Boolean activeItemsExistFor(DomainAgent loggedInAgent) {
        throw new UnsupportedOperationException("Method ServiceProblemStore activeItemsExistFor() not yet implemented");
    }

    @Override
    public void unassignAllWorkItems() {
        throw new UnsupportedOperationException("Method ServiceProblemStore unassignAllWorkItems() not yet implemented");
    }
}