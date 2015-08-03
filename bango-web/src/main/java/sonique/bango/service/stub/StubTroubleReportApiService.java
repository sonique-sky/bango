package sonique.bango.service.stub;

import com.google.common.collect.ImmutableList;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReport;
import sky.sns.spm.infrastructure.repository.DomainTroubleReportRepository;
import sonique.bango.service.TroubleReportApiService;
import spm.domain.ServiceProblemId;
import spm.domain.TroubleReportId;

import java.util.Collection;

public class StubTroubleReportApiService implements TroubleReportApiService {
    private final DomainTroubleReportRepository repository;

    public StubTroubleReportApiService(final DomainTroubleReportRepository repository) {
        this.repository = repository;
    }

    @Override
    public DomainTroubleReport troubleReportFor(TroubleReportId troubleReportId) {
        return repository.findByTroubleReportId(troubleReportId);
    }

    @Override
    public Collection<DomainTroubleReport> troubleReportsFor(ServiceProblemId serviceProblemId) {
        return ImmutableList.copyOf(repository.findByServiceProblemId(serviceProblemId));
    }
}
