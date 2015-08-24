package sonique.bango.service;

import sky.sns.spm.domain.model.troublereport.DomainTroubleReport;
import sonique.bango.domain.troublereport.TroubleReportTemplate;
import spm.domain.ServiceProblemId;
import spm.domain.TroubleReportId;

import java.util.Collection;

public interface TroubleReportApiService {
    DomainTroubleReport troubleReportFor(TroubleReportId troubleReportId);

    Collection<DomainTroubleReport> troubleReportsFor(ServiceProblemId serviceProblemId);

    TroubleReportTemplate troubleReportTemplateFor(ServiceProblemId serviceProblemId);
}
