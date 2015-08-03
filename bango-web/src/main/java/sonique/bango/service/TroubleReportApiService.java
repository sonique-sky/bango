package sonique.bango.service;

import sky.sns.spm.domain.model.troublereport.DomainTroubleReport;
import spm.domain.ServiceProblemId;
import spm.domain.TroubleReportId;

import java.util.Collection;

public interface TroubleReportApiService {
    DomainTroubleReport troubleReportFor(TroubleReportId troubleReportId);

    Collection<DomainTroubleReport> troubleReportsFor(ServiceProblemId serviceProblemId);
}
