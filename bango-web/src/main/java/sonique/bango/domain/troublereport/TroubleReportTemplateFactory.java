package sonique.bango.domain.troublereport;

import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.web.spmapp.shared.dto.LineTestSummaryDTO;
import sky.sns.spm.web.spmapp.shared.dto.TroubleReportSymptomDTO;

import java.util.Date;

import static sonique.datafixtures.DateTimeDataFixtures.someDateTimeInTheNextYear;
import static sonique.datafixtures.PrimitiveDataFixtures.*;
import static util.SupermanDataFixtures.someValidTestProductFor;

public class TroubleReportTemplateFactory {

    public TroubleReportTemplate createFrom(DomainServiceProblem serviceProblem) {

        return new TroubleReportTemplateBuilder()
                .with(serviceProblem.serviceProblemId())
                .with(serviceProblem.serviceId())
                .with(serviceProblem.troubleReportAttributes())
                .withSymptom(new TroubleReportSymptomDTO(someString(), someString(), someWords(), someBoolean(), someString(), someString()))
                .withLineTestSummary(new LineTestSummaryDTO(someString(), someString(), someString(), someBoolean(), someBoolean(), someBoolean()))
                .withEarliestAccessDate(Date.from(someDateTimeInTheNextYear().toInstant()))
                .withLatestAccessDate(Date.from(someDateTimeInTheNextYear().toInstant()))
                .withServiceType(serviceProblem.getServiceType())
                .withTestProduct(someValidTestProductFor(serviceProblem.getServiceType()))
                .build();
    }

}
