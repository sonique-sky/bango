package sonique.bango.domain.troublereport;

import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReportSymptom;
import sky.sns.spm.domain.model.troublereport.TroubleReportAttributeName;
import sky.sns.spm.interfaces.shared.TroubleReportSymptom;
import sky.sns.spm.web.spmapp.shared.dto.LineTestSummaryDTO;
import sky.sns.spm.web.spmapp.shared.dto.TroubleReportSymptomDTO;
import sonique.bango.store.SymptomStore;

import java.util.Date;
import java.util.List;

import static sky.sns.spm.domain.model.troublereport.TestProduct.allValidFor;
import static sonique.datafixtures.DateTimeDataFixtures.someDateTimeInTheNextYear;
import static sonique.datafixtures.PrimitiveDataFixtures.someBoolean;
import static sonique.datafixtures.PrimitiveDataFixtures.someString;
import static util.SupermanDataFixtures.someValidTestProductFor;

public class TroubleReportTemplateFactory {

    private final SymptomStore symptomRepository;

    public TroubleReportTemplateFactory(SymptomStore symptomRepository) {
        this.symptomRepository = symptomRepository;
    }

    public TroubleReportTemplate createFrom(DomainServiceProblem serviceProblem) {
        return new TroubleReportTemplateBuilder()
                .with(serviceProblem.serviceProblemId())
                .with(serviceProblem.serviceId())
                .with(serviceProblem.troubleReportAttributes())
                .withSymptom(getSymptom(serviceProblem))
                .withLineTestSummary(new LineTestSummaryDTO(someString(), someString(), someString(), someBoolean(), someBoolean(), someBoolean()))
                .withEarliestAccessDate(Date.from(someDateTimeInTheNextYear().toInstant()))
                .withLatestAccessDate(Date.from(someDateTimeInTheNextYear().toInstant()))
                .withServiceType(serviceProblem.getServiceType())
                .withTestProduct(allValidFor(serviceProblem.getServiceType()).isEmpty() ? null : someValidTestProductFor(serviceProblem.getServiceType()))
                .build();
    }

    private TroubleReportSymptomDTO getSymptom(DomainServiceProblem serviceProblem) {
        String symptomCode = serviceProblem.troubleReportAttributes().valueAsString(TroubleReportAttributeName.SymptomCode);
        List<DomainTroubleReportSymptom> symptoms = symptomRepository.findSymptomsBy(serviceProblem.getServiceType());

        if (symptoms.isEmpty()) {
            TroubleReportSymptom nullSymptom = DomainTroubleReportSymptom.nullTroubleReportSymptom();
            return new TroubleReportSymptomDTO(
                    nullSymptom.getSymptomCode(),
                    nullSymptom.getProviderCode(),
                    nullSymptom.getDescription(),
                    nullSymptom.mapsToNetworkFeature(),
                    nullSymptom.getMapToNetworkFeatureName(),
                    nullSymptom.getMapToNetworkFeaturePin()
            );
        }

        DomainTroubleReportSymptom troubleReportSymptom = symptoms
                .stream()
                .filter(domainTroubleReportSymptom -> symptomCode.equals(domainTroubleReportSymptom.getSymptomCode()))
                .findFirst()
                .get();

        return new TroubleReportSymptomDTO(
                troubleReportSymptom.getSymptomCode(),
                troubleReportSymptom.getProviderCode(),
                troubleReportSymptom.getDescription(),
                troubleReportSymptom.mapsToNetworkFeature(),
                troubleReportSymptom.getMapToNetworkFeatureName(),
                troubleReportSymptom.getMapToNetworkFeaturePin()
        );

    }

}
