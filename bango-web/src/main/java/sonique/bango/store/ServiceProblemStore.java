package sonique.bango.store;

import com.google.common.collect.Iterables;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.majorserviceproblem.DomainMajorServiceProblem;
import sky.sns.spm.domain.model.refdata.PresentedServiceType;
import sky.sns.spm.domain.model.refdata.Queue;
import sky.sns.spm.domain.model.serviceproblem.*;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReport;
import sky.sns.spm.domain.model.troublereport.TroubleReportAttributes;
import sky.sns.spm.domain.model.troublereport.TroubleReportAttributesBuilder;
import sky.sns.spm.infrastructure.repository.DomainServiceProblemRepository;
import sky.sns.spm.infrastructure.repository.QueueRepository;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.Filter;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.bango.domain.sorter.Comparators;
import sonique.bango.util.PagedSearchResultsCreator;
import spm.domain.*;
import spm.domain.model.refdata.DomainAgentBuilder;
import spm.messages.bt.types.DirectoryNumber;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.function.Function;
import java.util.function.Predicate;

import static com.google.common.collect.Collections2.filter;
import static com.google.common.collect.Lists.newArrayList;
import static org.apache.commons.lang3.reflect.FieldUtils.writeField;
import static sky.sns.spm.domain.model.serviceproblem.EventDescription.Note;
import static sonique.bango.domain.sorter.NestedFieldComparator.nestedDateFieldComparator;
import static sonique.bango.domain.sorter.NestedFieldComparator.nestedStringFieldComparator;
import static sonique.datafixtures.DateTimeDataFixtures.someDateTimeInTheLastYear;
import static sonique.datafixtures.DateTimeDataFixtures.someInstantInTheLast24Hours;
import static sonique.datafixtures.PrimitiveDataFixtures.*;
import static util.SupermanDataFixtures.*;

public class ServiceProblemStore implements DomainServiceProblemRepository {

    private final List<DomainServiceProblem> serviceProblems;
    private final SymptomStore symptomRepository;

    public ServiceProblemStore(QueueRepository queueStore, SymptomStore symptomRepository) {
        this.symptomRepository = symptomRepository;
        serviceProblems = newArrayList();

        List<Queue> queues = queueStore.getAllQueues();
        Long serviceProblemId = 1L;
        for (Queue queue : queues) {
            for (int i = 0; i < 40; i++, serviceProblemId++) {
                DomainWorkItem workItem = null;
                if (serviceProblemId % 2 == 0) {
                    workItem = DomainWorkItemBuilder.withAllDefaults().withAction(someWorkItemAction()).withCreatedDate(Date.from(someInstantInTheLast24Hours())).build();
                } else if (serviceProblemId % 3 == 0) {
                    DomainAgent agent = new DomainAgentBuilder().build();
                    workItem = DomainWorkItemBuilder.anAssignedPushWorkItem().withAgent(agent).withCreatedDate(Date.from(someInstantInTheLast24Hours())).build();
                }
                if (workItem != null) {
                    try {
                        writeField(workItem, "id", serviceProblemId, true);
                    } catch (IllegalAccessException e) {
                        throw new RuntimeException(e);
                    }
                }

                PresentedServiceType serviceTypeCode = pickOneOfExcluding(PresentedServiceType.WLR, PresentedServiceType.WifiDataService);

                DomainServiceProblem serviceProblem = new DomainServiceProblemBuilder()
                        .withServiceProblemId(new ServiceProblemId(serviceProblemId))
                        .withServiceId(new SnsServiceId(100L))
                        .withDirectoryNumber(new DirectoryNumber("directoryNumber-" + (serviceProblemId % 4)))
                        .withQueue(queue)
                        .withOpenDate(Date.from(someDateTimeInTheLastYear().toInstant()))
                        .withWorkItem(workItem)
                        .withPreferredContactName(someContactName().asString())
                        .withPreferredContactNumber(someTelephoneNumber().asString())
                        .withOperatorAccountNumber(someString())
                        .withOperatorReference(someOperatorReference())
                        .withServiceType(serviceTypeCode)
                        .withProblem(someProblemCategoryFor(serviceTypeCode))
                        .withTroubleReportAttributes(troubleReportAttributesFor(serviceTypeCode))
                        .build();
                serviceProblem.historyItems().add(ServiceProblemEventHistoryItem.createEvent(pickOneOf(EventDescription.class), Date.from(someInstantInTheLast24Hours()), someString(), allTheWords(), serviceProblem));
                serviceProblem.historyItems().add(ServiceProblemEventHistoryItem.createEvent(Note, Date.from(someInstantInTheLast24Hours()), someString(), someWords(), serviceProblem));
                serviceProblem.historyItems().add(ServiceProblemEventHistoryItem.createEvent(Note, Date.from(someInstantInTheLast24Hours()), someString(), someWords(), serviceProblem));

                serviceProblems.add(serviceProblem);
            }
        }
    }

    private TroubleReportAttributes troubleReportAttributesFor(PresentedServiceType serviceTypeCode) {
        TroubleReportAttributesBuilder builder = new TroubleReportAttributesBuilder();

        switch (serviceTypeCode) {
            case WLR3:
            case WLR3_Pro:
            case RoiOffnetVoice:
            case RoiRuralOffnetBroadband:
            case RoiUrbanOffnetBroadband:
            case RoiFttc:
                builder.withSymptomCode(symptomRepository.findSymptomsBy(serviceTypeCode.actualServiceType()).get(0).getSymptomCode());
                break;
            default:
                break;
        }

        return builder.build();
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
        for (DomainServiceProblem serviceProblem : serviceProblems) {
            for (DomainTroubleReport domainTroubleReport : serviceProblem.getTroubleReports()) {
                if (domainTroubleReport.getTroubleReportId().equals(troubleReportId)) {
                    return serviceProblem;
                }
            }
        }
        return null;
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
    public PagedSearchResults<DomainServiceProblem> searchForServiceProblemsInQueue(SearchParametersDTO queueId) {
        throw new UnsupportedOperationException("Method ServiceProblemStore searchForServiceProblemsInQueue() not yet implemented");
    }

    @Override
    public PagedSearchResults<DomainServiceProblem> searchForServiceProblems(SearchParametersDTO searchParameters) {
        return PagedSearchResultsCreator.createPageFor(searchParameters, serviceProblems, new ServiceProblemComparators(), SearchProperty.filterPredicate());
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

    private enum SearchProperty implements Function<Filter, Predicate<DomainServiceProblem>> {
        serviceProblemId(searchParameters -> serviceProblem -> serviceProblem.serviceProblemId().asString().equals(searchParameters.value())),
        serviceId(searchParameters -> serviceProblem -> serviceProblem.serviceId().asString().equals(searchParameters.value())),
        directoryNumber(searchParameters -> serviceProblem -> serviceProblem.getDirectoryNumber().asString().equals(searchParameters.value())),
        mspId(searchParameters -> serviceProblem -> false),
        queueId(searchParameters -> serviceProblem -> serviceProblem.getQueue().id().asString().equals(searchParameters.value()) && serviceProblem.getStatus() == ServiceProblemStatus.Open),
        status(searchParameters -> serviceProblem -> serviceProblem.getStatus() == ServiceProblemStatus.valueOf(searchParameters.value())),
        agent(searchParameters -> serviceProblem -> serviceProblem.isAssigned() && serviceProblem.workItem().agent().getAgentCode().equals(searchParameters.value()));

        private final Function<Filter, Predicate<DomainServiceProblem>> toPredicate;

        SearchProperty(Function<Filter, Predicate<DomainServiceProblem>> toPredicate) {
            this.toPredicate = toPredicate;
        }

        @Override
        public Predicate<DomainServiceProblem> apply(Filter filter) {
            return toPredicate.apply(filter);
        }

        public static Function<Filter, Predicate<DomainServiceProblem>> filterPredicate() {
            return filter -> SearchProperty.fromString(filter.property()).apply(filter);
        }

        public static SearchProperty fromString(String searchPropertyAsString) {
            for (SearchProperty searchProperty : values()) {
                if (searchProperty.name().equals(searchPropertyAsString))
                    return searchProperty;
            }
            throw new IllegalArgumentException(String.format("No SearchProperty for %s", searchPropertyAsString));
        }
    }

    private static class ServiceProblemComparators extends Comparators<DomainServiceProblem> {
        public ServiceProblemComparators() {
            add("serviceProblemId", (o1, o2) -> o1.serviceProblemId().compareTo(o2.serviceProblemId()));
            add("openedDate", (o1, o2) -> o1.openedDate().compareTo(o2.openedDate()));
            add("status", (o1, o2) -> o1.getStatus().compareTo(o2.getStatus()));
            add("queue", nestedStringFieldComparator((DomainServiceProblem sp) -> sp.queue().name().asString()));
            add("problem", nestedStringFieldComparator((DomainServiceProblem sp) -> sp.problem().description()));
            add("workItem.agent", nestedStringFieldComparator((DomainServiceProblem sp) -> sp.workItem().agent().details().getDisplayName()));
            add("workItem.action", nestedStringFieldComparator((DomainServiceProblem sp) -> sp.workItem().action().getDescription()));
            add("workItem.status", nestedStringFieldComparator((DomainServiceProblem sp) -> sp.workItem().status().name()));
            add("workItem.type", nestedStringFieldComparator((DomainServiceProblem sp) -> sp.workItem().assignmentType().description()));
            add("workItem.createdDate", nestedDateFieldComparator((DomainServiceProblem sp) -> sp.workItem().createdDate()));
        }
    }

}