package sonique.bango.service;

import sky.sns.spm.domain.model.refdata.ServiceType;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReport;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReportSymptom;
import sonique.bango.domain.troublereport.TroubleReportTemplate;
import spm.domain.ServiceProblemId;
import spm.domain.TroubleReportId;

import java.util.Collection;
import java.util.List;

public interface TroubleReportApiService {
    DomainTroubleReport troubleReportWithId(TroubleReportId troubleReportId);

    Collection<DomainTroubleReport> troubleReportsFor(ServiceProblemId serviceProblemId);

    TroubleReportTemplate templateFor(ServiceProblemId serviceProblemId);

    List<DomainTroubleReportSymptom> symptomsFor(ServiceType serviceType);

    void raiseTroubleReport(TroubleReportTemplate troubleReportTemplate);
}
