package sonique.bango.service.stub;

import com.google.common.collect.ImmutableList;
import sky.sns.spm.domain.model.refdata.ServiceType;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReport;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReportSymptom;
import sky.sns.spm.infrastructure.repository.DomainServiceProblemRepository;
import sky.sns.spm.infrastructure.repository.DomainTroubleReportRepository;
import sonique.bango.domain.troublereport.TroubleReportTemplate;
import sonique.bango.domain.troublereport.TroubleReportTemplateFactory;
import sonique.bango.service.TroubleReportApiService;
import spm.domain.ServiceProblemId;
import spm.domain.TroubleReportId;

import java.util.Collection;
import java.util.List;

public class StubTroubleReportApiService implements TroubleReportApiService {

    private final DomainTroubleReportRepository troubleReportRepository;
    private final DomainServiceProblemRepository serviceProblemRepository;
    private final TroubleReportTemplateFactory troubleReportTemplateFactory;

    public StubTroubleReportApiService(
            DomainTroubleReportRepository troubleReportRepository,
            DomainServiceProblemRepository serviceProblemRepository,
            TroubleReportTemplateFactory troubleReportTemplateFactory) {
        this.troubleReportRepository = troubleReportRepository;
        this.serviceProblemRepository = serviceProblemRepository;
        this.troubleReportTemplateFactory = troubleReportTemplateFactory;
    }

    @Override
    public DomainTroubleReport troubleReportWithId(TroubleReportId troubleReportId) {
        return troubleReportRepository.findByTroubleReportId(troubleReportId);
    }

    @Override
    public Collection<DomainTroubleReport> troubleReportsFor(ServiceProblemId serviceProblemId) {
        return ImmutableList.copyOf(troubleReportRepository.findByServiceProblemId(serviceProblemId));
    }

    @Override
    public TroubleReportTemplate templateFor(ServiceProblemId serviceProblemId) {
        return troubleReportTemplateFactory.createFrom(serviceProblemRepository.findByServiceProblemId(serviceProblemId));
    }

    @Override
    public List<DomainTroubleReportSymptom> symptomsFor(ServiceType serviceType) {
        return troubleReportRepository.getTroubleReportSymptomsFor(serviceType);
    }
}
