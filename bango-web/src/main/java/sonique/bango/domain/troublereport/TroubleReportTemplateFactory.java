package sonique.bango.domain.troublereport;

import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReport;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReportSymptom;
import sky.sns.spm.domain.model.troublereport.TroubleReportAttributeName;
import sky.sns.spm.interfaces.shared.TroubleReportSymptom;
import sky.sns.spm.web.spmapp.shared.dto.LineTestSummaryDTO;
import sky.sns.spm.web.spmapp.shared.dto.TroubleReportSymptomDTO;
import sonique.bango.store.SymptomStore;

import java.util.Date;
import java.util.List;
import java.util.Optional;

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
        Optional<DomainTroubleReport> openTroubleReport = serviceProblem.getTroubleReports().stream().filter(domainTroubleReport -> domainTroubleReport.getStatus().isInFlight()).findFirst();

        if (openTroubleReport.isPresent()) {
            DomainTroubleReport domainTroubleReport = openTroubleReport.get();
            return new TroubleReportTemplateBuilder()
                    .with(domainTroubleReport.getServiceProblemId())
                    .with(domainTroubleReport.getServiceId())
                    .withTroubleReportId(domainTroubleReport.getTroubleReportId())
                    .withDescription(domainTroubleReport.getShortDescription().asString())
                    .withTestProduct(domainTroubleReport.getTestProduct())
                    .withAppointmentReference(domainTroubleReport.getAppointmentReference())
                    .withAccessHazards(domainTroubleReport.getAccessHazards())
                    .withAccessNotes(domainTroubleReport.getAccessNotes().asString())
                    .withContactName(domainTroubleReport.getContactName().asString())
                    .withContactNumber(domainTroubleReport.getContactNumber().asString())
                    .withSecondaryContactName(domainTroubleReport.getSecondaryContactName().asString())
                    .withSecondaryContactNumber(domainTroubleReport.getSecondaryContactNumber().asString())
                    .withTwentyFourHourAccess(domainTroubleReport.isTwentyFourHourAccess())
                    .withEarliestAccessDate(domainTroubleReport.getEarliestAccessDate())
                    .withLatestAccessDate(domainTroubleReport.getLatestAccessDate())
                    .withTemporaryCallDiversionNumber(domainTroubleReport.getTemporaryCallDiversionNumber().asString())
                    .withSymptom(getSymptom(domainTroubleReport.getSymptom()))
                    .withLineTestSummary(getLineTestSummary(domainTroubleReport))
                    .withServiceType(domainTroubleReport.serviceType())
                    .build();
        }

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

    private LineTestSummaryDTO getLineTestSummary(DomainTroubleReport domainTroubleReport) {
        if (domainTroubleReport.getLineTestReference() != null && domainTroubleReport.providerReference() != null) {
            return new LineTestSummaryDTO(domainTroubleReport.getLineTestReference().asString(), domainTroubleReport.getPerformerLineTestReference().asString());
        }
        return new LineTestSummaryDTO(null, null);
    }

    private TroubleReportSymptomDTO getSymptom(TroubleReportSymptom symptom) {
        if (symptom == null) {
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

        return new TroubleReportSymptomDTO(
                symptom.getSymptomCode(),
                symptom.getProviderCode(),
                symptom.getDescription(),
                symptom.mapsToNetworkFeature(),
                symptom.getMapToNetworkFeatureName(),
                symptom.getMapToNetworkFeaturePin()
        );
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
