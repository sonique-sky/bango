package sonique.bango.store;

import sky.sns.spm.domain.model.refdata.ProviderClearTroubleReportResolution;
import sky.sns.spm.domain.model.refdata.ServiceType;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReport;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReportSymptom;
import sky.sns.spm.infrastructure.repository.DomainServiceProblemRepository;
import sky.sns.spm.infrastructure.repository.DomainTroubleReportRepository;
import spm.domain.ProviderReference;
import spm.domain.ServiceProblemId;
import spm.domain.TroubleReportId;
import spm.messages.bt.types.Code;

import java.util.List;

import static sonique.datafixtures.PrimitiveDataFixtures.someLongBetween;

public class TroubleReportStore implements DomainTroubleReportRepository {

    private final DomainServiceProblemRepository serviceProblemRepository;
    private final SymptomStore symptomRepository;

    public TroubleReportStore(final DomainServiceProblemRepository serviceProblemRepository, SymptomStore symptomRepository) {
        this.serviceProblemRepository = serviceProblemRepository;
        this.symptomRepository = symptomRepository;
    }

    @Override
    public DomainTroubleReport findByProviderReference(ProviderReference providerReference) {
        throw new UnsupportedOperationException("Method TroubleReportStore findByProviderReference() not yet implemented");
    }

    @Override
    public DomainTroubleReport findByTroubleReportId(TroubleReportId troubleReportId) {
        return serviceProblemRepository.findByTroubleReportId(troubleReportId).getTroubleReports().get(0);
    }

    @Override
    public List<DomainTroubleReport> findByServiceProblemId(ServiceProblemId serviceProblemId) {
        return serviceProblemRepository.findByServiceProblemId(serviceProblemId).getTroubleReports();
    }

    @Override
    public ProviderClearTroubleReportResolution getProviderClearTroubleReportResolution(Code clearCode, ServiceType serviceType) {
        throw new UnsupportedOperationException("Method TroubleReportStore getProviderClearTroubleReportResolution() not yet implemented");
    }

    @Override
    public DomainTroubleReportSymptom findTroubleReportSymptomBySymptomCode(String symptomCode, ServiceType serviceType) {
        throw new UnsupportedOperationException("Method TroubleReportStore findTroubleReportSymptomBySymptomCode() not yet implemented");
    }

    @Override
    public List<DomainTroubleReportSymptom> getTroubleReportSymptomsFor(ServiceType serviceType) {
        return symptomRepository.findSymptomsBy(serviceType);
    }

    @Override
    public TroubleReportId nextTroubleReportId() {
        return new TroubleReportId(someLongBetween(0, 1000));
    }
}
