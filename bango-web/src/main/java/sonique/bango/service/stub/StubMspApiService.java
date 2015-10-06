package sonique.bango.service.stub;

import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.majorserviceproblem.DomainMajorServiceProblem;
import sky.sns.spm.domain.model.majorserviceproblem.DomainMajorServiceProblemDashboardEntry;
import sky.sns.spm.domain.model.serviceproblem.EventDescription;
import sky.sns.spm.infrastructure.repository.DomainMajorServiceProblemRepository;
import sky.sns.spm.infrastructure.security.AuthorisedActorProvider;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.Filter;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.bango.domain.sorter.Comparators;
import sonique.bango.service.MspApiService;
import sonique.bango.util.PagedSearchResultsCreator;
import spm.domain.MajorServiceProblemId;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.function.Function;
import java.util.function.Predicate;

import static com.google.common.base.Strings.isNullOrEmpty;

public class StubMspApiService implements MspApiService {

    private final AuthorisedActorProvider authorisedActorProvider;
    private final DomainMajorServiceProblemRepository repository;
    private final MajorServiceProblemDashboardEntryComparators mspDashboardEntryComparators;
    private final MajorServiceProblemDashboardEntryFilterSupplier mspDashboardEntryFilterSupplier;


    public StubMspApiService(
            AuthorisedActorProvider authorisedActorProvider,
            DomainMajorServiceProblemRepository repository) {
        this.authorisedActorProvider = authorisedActorProvider;
        this.repository = repository;
        this.mspDashboardEntryComparators = new MajorServiceProblemDashboardEntryComparators();
        this.mspDashboardEntryFilterSupplier = new MajorServiceProblemDashboardEntryFilterSupplier();
    }

    @Override
    public PagedSearchResults<DomainMajorServiceProblemDashboardEntry> read(SearchParametersDTO searchParameters) {
        return PagedSearchResultsCreator.createPageFor(
                searchParameters,
                repository.findDashboardEntries(searchParameters),
                mspDashboardEntryComparators,
                mspDashboardEntryFilterSupplier
        );
    }

    @Override
    public List<EventHistoryItem> eventHistory(MajorServiceProblemId majorServiceProblemId) {
        DomainMajorServiceProblem majorServiceProblem = repository.findByMajorServiceProblemId(majorServiceProblemId);
        return majorServiceProblem.historyItems();
    }

    @Override
    public DomainMajorServiceProblem create(DomainMajorServiceProblem msp) {
        String detailedNote = msp.getDetailedNote();
        if (!isNullOrEmpty(detailedNote)) {
            msp.addNote(detailedNote, authorisedActorProvider.authorisedActor(), new Date());
        }
        return repository.insert(msp);
    }

    @Override
    public DomainMajorServiceProblem close(MajorServiceProblemId majorServiceProblemId) {
        DomainMajorServiceProblem majorServiceProblem = repository.findByMajorServiceProblemId(majorServiceProblemId);
        if (!majorServiceProblem.isClosed()) {
            majorServiceProblem.close(new Date(), authorisedActorProvider.authorisedActor());
        }

        //TODO Superman service should Clear associated service problems
        //TODO Superman service should Send SERVICE_PROBLEM_CLEARED event to troll
        //TODO Superman service should Add MajorServiceProblemClosedHistoryEvent to Service Problem
        return repository.update(majorServiceProblem);
    }

    @Override
    public EventHistoryItem addNote(MajorServiceProblemId majorServiceProblemId, String note) {
        DomainMajorServiceProblem majorServiceProblem = repository.findByMajorServiceProblemId(majorServiceProblemId);
        majorServiceProblem.addNote(
                note,
                authorisedActorProvider.authorisedActor(),
                new Date()
        );

        return new DomainMajorServiceProblem.MajorServiceProblemEventHistoryItem(EventDescription.Note, new Date(), authorisedActorProvider.getLoggedInAgent().getAgentCode(), note, majorServiceProblem);
    }

    private static class MajorServiceProblemDashboardEntryFilterSupplier implements Function<Filter, Predicate<DomainMajorServiceProblemDashboardEntry>> {

        private MajorServiceProblemDashboardEntryFilterSupplier() {
        }

        @Override
        public Predicate<DomainMajorServiceProblemDashboardEntry> apply(Filter term) {
            switch (term.property()) {
                case "showRecentlyClosed":
                    return showRecentlyClosed(Boolean.valueOf(term.value()));
                case "hideManuallyCreated":
                    return hideManuallyCreated(Boolean.valueOf(term.value()));
                default:
                    throw new IllegalArgumentException(String.format("filter by %s is not supported", term.property()));
            }
        }

        private Predicate<DomainMajorServiceProblemDashboardEntry> hideManuallyCreated(Boolean enabled) {
            return entry -> !enabled || entry.getOutageId() != null;
        }

        private Predicate<DomainMajorServiceProblemDashboardEntry> showRecentlyClosed(Boolean enabled) {
            return entry -> {
                if (enabled) {
                    return entry.getClosedDate() != null && entry.getClosedDate().toInstant().isAfter(Instant.now().minus(5, ChronoUnit.DAYS));
                } else {
                    return null == entry.getClosedDate();
                }
            };
        }
    }

    private static class MajorServiceProblemDashboardEntryComparators extends Comparators<DomainMajorServiceProblemDashboardEntry> {
        public MajorServiceProblemDashboardEntryComparators() {
            add("id", (o1, o2) -> o1.getId().compareTo(o2.getId()));
            add("description", (o1, o2) -> o1.getDescription().compareTo(o2.getDescription()));
            add("startDate", (o1, o2) -> o1.getStartDate().compareTo(o2.getStartDate()));
            add("expectedResolutionDate", (o1, o2) -> o1.getExpectedResolutionDate().compareTo(o2.getExpectedResolutionDate()));
            add("outageId", (o1, o2) -> o1.getOutageId().compareTo(o2.getOutageId()));
            add("serviceCount", (o1, o2) -> new Integer(o1.getServiceCount()).compareTo(o2.getServiceCount()));
            add("serviceProblemCount", (o1, o2) -> new Integer(o1.getServiceProblemCount()).compareTo(o2.getServiceProblemCount()));
            add("closedDate", (o1, o2) -> o1.getClosedDate().compareTo(o2.getClosedDate()));
        }
    }

}
