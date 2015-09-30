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

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Maps.newHashMap;
import static com.google.common.collect.Sets.newHashSet;
import static java.util.stream.Collectors.toList;
import static sonique.datafixtures.DateTimeDataFixtures.someInstantInTheLast24Hours;
import static sonique.datafixtures.DomainDataFixtures.someForename;
import static sonique.datafixtures.DomainDataFixtures.someSurname;
import static sonique.datafixtures.PrimitiveDataFixtures.someNumberBetween;
import static sonique.datafixtures.PrimitiveDataFixtures.someWords;
import static util.SupermanDataFixtures.someEventDescription;

public class MspStore implements DomainMajorServiceProblemRepository {

    private final Map<MajorServiceProblemId, DomainMajorServiceProblem> msps = newHashMap();
    private final AtomicLong id = new AtomicLong(0);

    public MspStore() {
        for (int i = 1; i < 23; i++) {
            MajorServiceProblemId majorServiceProblemId = new MajorServiceProblemId(id.incrementAndGet());
            msps.put(majorServiceProblemId, new DomainMajorServiceProblemBuilder()
                            .withId(majorServiceProblemId)
                            .withDescription(String.format("MSP #%02d", majorServiceProblemId.asLong()))
                            .withStartDate(new MajorServiceProblemDateTime(new Date()))
                            .withDetailedNote("A big problem")
                            .withNimOutageId(new OutageId(UUID.randomUUID().toString()))
                            .withServiceIds(newHashSet())
                            .withHistoryItems(someMajorServiceProblemEventHistoryItem())
                            .build()
            );
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
        return msps.get(majorServiceProblemId);
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
        return msps.values().stream().map(msp ->
                        new DomainMajorServiceProblemDashboardEntry(
                                msp.id().asLong(),
                                msp.getDescription(),
                                msp.getStartDate().asDate(),
                                msp.getExpectedResolutionDate().asDate(),
                                msp.outageId().asString(),
                                msp.getServiceIds().size(),
                                33
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

}
