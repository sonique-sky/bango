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
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import static com.google.common.collect.Sets.newHashSet;
import static java.util.stream.Collectors.toList;

public class MspStore implements DomainMajorServiceProblemRepository {

    private final List<DomainMajorServiceProblem> msps = new ArrayList<>();

    public MspStore() {
        for (int i = 1; i < 23; i++) {
            msps.add(new DomainMajorServiceProblemBuilder()
                    .withId((long) i)
                    .withDescription(String.format("MSP #%02d", i))
                    .withStartDate(new MajorServiceProblemDateTime(new Date()))
                    .withDetailedNote("A big problem")
                    .withNimOutageId(new OutageId(UUID.randomUUID().toString()))
                    .withServiceIds(newHashSet())
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
        throw new UnsupportedOperationException("Method MspStore findByMajorServiceProblemId() not yet implemented");
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

        return msps.stream().map(msp ->
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
}
