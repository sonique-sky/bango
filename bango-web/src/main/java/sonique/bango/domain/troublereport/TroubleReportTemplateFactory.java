package sonique.bango.domain.troublereport;

import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;

public class TroubleReportTemplateFactory {

    public TroubleReportTemplate createFrom(DomainServiceProblem serviceProblem) {
        return new TroubleReportTemplateBuilder()
                .with(serviceProblem.serviceProblemId())
                .with(serviceProblem.serviceId())
                .with(serviceProblem.troubleReportAttributes())
                .build();
    }

}
