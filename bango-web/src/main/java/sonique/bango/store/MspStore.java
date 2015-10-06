package sonique.bango.store;

import com.google.common.base.Throwables;
import sky.sns.spm.domain.model.majorserviceproblem.DomainMajorServiceProblem;
import sky.sns.spm.domain.model.majorserviceproblem.DomainMajorServiceProblemBuilder;
import sky.sns.spm.domain.model.majorserviceproblem.DomainMajorServiceProblemDashboardEntry;
import sky.sns.spm.infrastructure.repository.DomainMajorServiceProblemRepository;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import spm.domain.MajorServiceProblemDateTime;
import spm.domain.MajorServiceProblemId;
import spm.domain.OutageId;
import spm.domain.SnsServiceId;

import java.lang.reflect.Field;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Stream;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Maps.newHashMap;
import static com.google.common.collect.Sets.newHashSet;
import static java.lang.Boolean.FALSE;
import static java.lang.Boolean.TRUE;
import static java.time.LocalDateTime.now;
import static java.time.temporal.ChronoUnit.DAYS;
import static java.util.stream.Collectors.toList;
import static sonique.datafixtures.DateTimeDataFixtures.*;
import static sonique.datafixtures.DomainDataFixtures.someForename;
import static sonique.datafixtures.DomainDataFixtures.someSurname;
import static sonique.datafixtures.PrimitiveDataFixtures.someNumberBetween;
import static sonique.datafixtures.PrimitiveDataFixtures.someWords;
import static util.SupermanDataFixtures.someEventDescription;
import static util.SupermanDataFixtures.someSnsServiceId;

public class MspStore implements DomainMajorServiceProblemRepository {

    private final Map<MajorServiceProblemId, DomainMajorServiceProblem> majorServiceProblems = newHashMap();
    private final AtomicLong id = new AtomicLong(0);

    public MspStore() {
        for (int i = 1; i < 100; i++) {
            MajorServiceProblemId majorServiceProblemId = new MajorServiceProblemId(id.incrementAndGet());
            DomainMajorServiceProblemBuilder majorServiceProblemBuilder = new DomainMajorServiceProblemBuilder()
                    .withId(majorServiceProblemId)
                    .withDescription(String.format("MSP #%02d", majorServiceProblemId.asLong()))
                    .withStartDate(new MajorServiceProblemDateTime(someDateTimeInTheLast(Duration.of(3, DAYS)).toInstant()))
                    .withExpectedResolutionDate(new MajorServiceProblemDateTime(someDateTimeInTheNext24Hours().toInstant()))
                    .withDetailedNote(someWords())
                    .withServiceIds(newHashSet())
                    .withHistoryItems(someMajorServiceProblemEventHistoryItem());

            if (majorServiceProblemId.asInteger() % 2 == 0) {
                majorServiceProblemBuilder.withNimOutageId(new OutageId(UUID.randomUUID().toString()));
            }

            if (majorServiceProblemId.asInteger() % 3 == 0) {
                majorServiceProblemBuilder.withClosedDate(Date.from(
                                someInstantInTheLast(
                                        Duration.between(
                                                now().minus(10, DAYS),
                                                now().minus(1, DAYS)
                                        )
                                )
                        )
                );
            }

            majorServiceProblems.put(majorServiceProblemId, majorServiceProblemBuilder.build());
        }
    }

    @Override
    public DomainMajorServiceProblem insert(DomainMajorServiceProblem msp) {
        MajorServiceProblemId mspId = new MajorServiceProblemId(this.id.incrementAndGet());
        try {
            Field idField = DomainMajorServiceProblem.class.getDeclaredField("id");
            idField.setAccessible(true);
            idField.set(msp, mspId);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            Throwables.propagate(e);
        }
        majorServiceProblems.put(mspId, msp);
        return msp;
    }

    @Override
    public List<DomainMajorServiceProblem> findNonClosed() {
        throw new UnsupportedOperationException("Method MspStore findNonClosed() not yet implemented");
    }

    @Override
    public List<DomainMajorServiceProblem> findAllNonClosedForService(SnsServiceId snsServiceId) {
        throw new UnsupportedOperationException("Method MspStore findAllNonClosedForService() not yet implemented");
    }

    @Override
    public List<DomainMajorServiceProblem> findAllActiveForService(SnsServiceId snsServiceId) {
        throw new UnsupportedOperationException("Method MspStore findAllActiveForService() not yet implemented");
    }

    @Override
    public DomainMajorServiceProblem findByMajorServiceProblemId(MajorServiceProblemId majorServiceProblemId) {
        return majorServiceProblems.get(majorServiceProblemId);
    }

    @Override
    public DomainMajorServiceProblem findByOutageId(OutageId outageId) {
        throw new UnsupportedOperationException("Method MspStore findByOutageId() not yet implemented");
    }

    @Override
    public DomainMajorServiceProblem update(DomainMajorServiceProblem majorServiceProblem) {
        majorServiceProblems.put(majorServiceProblem.id(), majorServiceProblem);
        return majorServiceProblem;
    }

    @Override
    public List<DomainMajorServiceProblemDashboardEntry> findDashboardEntries(SearchParametersDTO searchParameters) {

        Stream<DomainMajorServiceProblem> mspStream = majorServiceProblems.values().stream();

        boolean showRecentlyClosed = searchParameters.filters() == null
                ? false
                : searchParameters.filters().stream().anyMatch(filter -> "showRecentlyClosed".equals(filter.property()) && TRUE.toString().equals(filter.value()));

        boolean showManuallyCreated = searchParameters.filters() == null
                ? false
                : searchParameters.filters().stream().anyMatch(filter -> "hideManuallyCreated".equals(filter.property()) && FALSE.toString().equals(filter.value()));


        List<DomainMajorServiceProblem> filteredMsp;
        if (showRecentlyClosed) {
            Instant fiveDaysAgo = LocalDate.now().minus(5, DAYS).atStartOfDay(ZoneId.systemDefault()).toInstant();
            filteredMsp = mspStream.filter(msp -> msp.getClosedDate() != null && msp.getClosedDate().after(Date.from(fiveDaysAgo))).collect(toList());
        } else {
            filteredMsp = mspStream.filter(msp -> !msp.isClosed()).collect(toList());
        }

        if (showManuallyCreated) {
            filteredMsp.stream().filter(msp -> msp.outageId() == null || OutageId.nullOutageId().equals(msp.outageId()));
        } else {
            filteredMsp.stream().filter(msp -> msp.outageId() != null && !msp.outageId().isNull());
        }

        return filteredMsp.stream()
                .map(msp -> new DomainMajorServiceProblemDashboardEntry(
                                msp.id().asLong(),
                                msp.getDescription(),
                                msp.getStartDate().asDate(),
                                msp.getExpectedResolutionDate().asDate(),
                                msp.outageId() == null ? null : msp.outageId().asString(),
                                msp.getServiceIds().size(),
                                0,
                                msp.getClosedDate()
                        )
                ).collect(toList());
    }

    @Override
    public List<DomainMajorServiceProblemDashboardEntry> findOpenDashboardEntries() {
        throw new UnsupportedOperationException("Method MspStore findOpenDashboardEntries() not yet implemented");
    }

    @Override
    public List<DomainMajorServiceProblemDashboardEntry> findClosedDashboardEntriesSince(LocalDate date) {
        throw new UnsupportedOperationException("Method MspStore findClosedDashboardEntriesSince() not yet implemented");
    }

    @Override
    public List<DomainMajorServiceProblem> getAllEligibleMajorServiceProblemsForServiceProblem(Long aLong) {
        throw new UnsupportedOperationException("Method MspStore getAllEligibleMajorServiceProblemsForServiceProblem() not yet implemented");
    }

    private static List<DomainMajorServiceProblem.MajorServiceProblemEventHistoryItem> someMajorServiceProblemEventHistoryItem() {
        List<DomainMajorServiceProblem.MajorServiceProblemEventHistoryItem> list = newArrayList();
        for (int i = 0; i < someNumberBetween(6, 10); i++) {
            list.add(new DomainMajorServiceProblem.MajorServiceProblemEventHistoryItem(
                    someEventDescription(),
                    Date.from(someInstantInTheLast24Hours()),
                    someForename() + "." + someSurname(),
                    someWords(),
                    null
            ));
        }
        return list;
    }

    private HashSet<SnsServiceId> someServiceIds() {
        HashSet<SnsServiceId> snsServiceIds = newHashSet();
        for (int i = 0; i < someNumberBetween(1, 3); i++) {
            snsServiceIds.add(someSnsServiceId());
        }
        return snsServiceIds;
    }

}
