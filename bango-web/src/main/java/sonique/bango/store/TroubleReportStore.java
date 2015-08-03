package sonique.bango.store;

import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.refdata.ProviderClearTroubleReportResolution;
import sky.sns.spm.domain.model.refdata.ServiceType;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReport;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReportBuilder;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReportSymptom;
import sky.sns.spm.domain.model.troublereport.TroubleReportStatus;
import sky.sns.spm.infrastructure.repository.DomainServiceProblemRepository;
import sky.sns.spm.infrastructure.repository.DomainTroubleReportRepository;
import spm.domain.ProviderReference;
import spm.domain.ServiceProblemId;
import spm.domain.TroubleReportId;
import spm.messages.bt.types.Code;

import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toMap;
import static sky.sns.spm.domain.model.troublereport.TestProduct.allValidFor;
import static sonique.datafixtures.PrimitiveDataFixtures.pickOneOf;
import static util.SupermanDataFixtures.*;

public class TroubleReportStore implements DomainTroubleReportRepository {

    private final Map<TroubleReportId, DomainTroubleReport> troubleReports;

    public TroubleReportStore(final List<DomainAgent> agents, final DomainServiceProblemRepository serviceProblemRepository) {
        troubleReports = agents
                .stream()
                .map(serviceProblemRepository::getServiceProblemsForAgent)
                .flatMap(domainServiceProblems -> domainServiceProblems
                        .stream()
                        .map(serviceProblem -> new DomainTroubleReportBuilder().withStatus(pickOneOf(TroubleReportStatus.class))
                                .withSymptom(someTroubleReportSymptom())
                                .withFaultCode(someFaultCode().asString())
                                .withAppointmentReference(someAppointmentReference().asString())
                                .withTestProduct(pickOneOf(allValidFor(serviceProblem.getServiceType())))
                                .withServiceProblem(serviceProblem).build()))
                .collect(toMap(DomainTroubleReport::getTroubleReportId, troubleReport -> troubleReport));

    }

    @Override
    public DomainTroubleReport findByProviderReference(ProviderReference providerReference) {
        throw new UnsupportedOperationException("Method TroubleReportStore findByProviderReference() not yet implemented");
    }

    @Override
    public DomainTroubleReport findByTroubleReportId(TroubleReportId troubleReportId) {
        return troubleReports.get(troubleReportId);
    }

    @Override
    public List<DomainTroubleReport> findByServiceProblemId(ServiceProblemId serviceProblemId) {
        return troubleReports.values()
                .stream()
                .filter(troubleReport -> troubleReport.getServiceProblemId().equals(serviceProblemId))
                .collect(toList());
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
        return troubleReports.values()
                .stream()
                .filter(troubleReport -> troubleReport.getServiceProblem().getServiceType() == serviceType)
                .map((troubleReport) -> (DomainTroubleReportSymptom) troubleReport.getSymptom())
                .collect(toList());
    }

    @Override
    public TroubleReportId nextTroubleReportId() {
        throw new UnsupportedOperationException("Method TroubleReportStore nextTroubleReportId() not yet implemented");
    }
}
