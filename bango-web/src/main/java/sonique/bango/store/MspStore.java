package sonique.bango.store;

import sky.sns.spm.domain.model.majorserviceproblem.DomainMajorServiceProblem;
import sky.sns.spm.domain.model.majorserviceproblem.DomainMajorServiceProblemBuilder;
import sky.sns.spm.domain.model.majorserviceproblem.DomainMajorServiceProblemDashboardEntry;
import sky.sns.spm.infrastructure.repository.DomainMajorServiceProblemRepository;
import sky.sns.spm.interfaces.shared.MajorServiceProblem;
import spm.domain.MajorServiceProblemDateTime;
import spm.domain.MajorServiceProblemId;
import spm.domain.OutageId;
import spm.domain.SnsServiceId;

import java.time.Duration;
import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Maps.newHashMap;
import static com.google.common.collect.Sets.newHashSet;
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
        for (int i = 1; i < 23; i++) {
            MajorServiceProblemId majorServiceProblemId = new MajorServiceProblemId(id.incrementAndGet());
            DomainMajorServiceProblemBuilder majorServiceProblemBuilder = new DomainMajorServiceProblemBuilder()
                    .withId(majorServiceProblemId)
                    .withDescription(String.format("MSP #%02d", majorServiceProblemId.asLong()))
                    .withStartDate(new MajorServiceProblemDateTime(someDateTimeInTheLast(Duration.of(3, DAYS)).toInstant()))
                    .withExpectedResolutionDate(new MajorServiceProblemDateTime(someDateTimeInTheNext24Hours().toInstant()))
                    .withDetailedNote(someWords())
                    .withNimOutageId(new OutageId(UUID.randomUUID().toString()))
                    .withServiceIds(someServiceIds())
                    .withHistoryItems(someMajorServiceProblemEventHistoryItem());

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
    public DomainMajorServiceProblem insert(DomainMajorServiceProblem domainMajorServiceProblem) {
        throw new UnsupportedOperationException("Method MspStore insert() not yet implemented");
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
    public MajorServiceProblem update(MajorServiceProblem majorServiceProblem) {
        throw new UnsupportedOperationException("Method MspStore update() not yet implemented");
    }

    @Override
    public List<DomainMajorServiceProblemDashboardEntry> findOpenDashBoardEntries() {
        return majorServiceProblems.values().stream().map(msp ->
                        new DomainMajorServiceProblemDashboardEntry(
                                msp.id().asLong(),
                                msp.getDescription(),
                                msp.getStartDate().asDate(),
                                msp.getExpectedResolutionDate().asDate(),
                                msp.outageId().asString(),
                                msp.getServiceIds().size(),
                                someNumberBetween(5, 50)
                        )
        ).collect(toList());
    }

    @Override
    public List<DomainMajorServiceProblem> getAllEligibleMajorServiceProblemsForServiceProblem(Long aLong) {
        throw new UnsupportedOperationException("Method MspStore getAllEligibleMajorServiceProblemsForServiceProblem() not yet implemented");
    }

    @Override
    public List<DomainMajorServiceProblem> findAllClosedSince(LocalDate localDate) {
        throw new UnsupportedOperationException("Method MspStore findAllClosedSince() not yet implemented");
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
