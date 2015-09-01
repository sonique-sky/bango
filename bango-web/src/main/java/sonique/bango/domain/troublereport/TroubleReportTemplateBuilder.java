package sonique.bango.domain.troublereport;

import sky.sns.spm.domain.model.diagnostic.sqc.StructuredQuestionCode;
import sky.sns.spm.domain.model.refdata.ServiceType;
import sky.sns.spm.domain.model.troublereport.TestProduct;
import sky.sns.spm.domain.model.troublereport.TroubleReportAttributes;
import sky.sns.spm.domain.model.troublereport.TroubleReportStatus;
import sky.sns.spm.web.spmapp.shared.dto.LineTestSummaryDTO;
import sky.sns.spm.web.spmapp.shared.dto.TroubleReportSymptomDTO;
import spm.domain.ServiceProblemId;
import spm.domain.SnsServiceId;
import spm.domain.TroubleReportId;

import java.util.Date;

import static sky.sns.spm.domain.model.troublereport.TroubleReportAttributeName.*;

public class TroubleReportTemplateBuilder {

    private ServiceProblemId serviceProblemId;
    private TroubleReportId troubleReportId;
    private SnsServiceId serviceId;
    private LineTestSummaryDTO lineTestSummary;
    private String providerReference;
    private String btReference;
    private String description;
    private TestProduct testProduct;
    private String appointmentReference;
    private String accessHazards;
    private String accessNotes;
    private String contactName;
    private String contactNumber;
    private String secondaryContactName;
    private String secondaryContactNumber;
    private boolean cancelRequested;
    private boolean amendRequested;
    private boolean confirmEquipmentDisconnectedRequested;
    private boolean broadbandFault;
    private Boolean twentyFourHourAccess;
    private Boolean coopCallRequested;
    private Boolean disRequested;
    private Boolean isResponseRequired;
    private Boolean intermittentProblem;
    private String notes;
    private TroubleReportStatus status;
    private Integer upperTrcBand = 0;
    private String temporaryCallDiversionNumber;
    private Date earliestAccessDate;
    private Date latestAccessDate;
    private StructuredQuestionCode structuredQuestionCode;
    private TroubleReportSymptomDTO symptom;
    private ServiceType serviceType;

    public TroubleReportTemplate build() {
        return new TroubleReportTemplate(
                serviceProblemId,
                serviceType,
                troubleReportId,
                serviceId,
                lineTestSummary,
                providerReference,
                btReference,
                description,
                testProduct,
                appointmentReference,
                accessHazards,
                accessNotes,
                contactName,
                contactNumber,
                secondaryContactName,
                secondaryContactNumber,
                cancelRequested,
                amendRequested,
                confirmEquipmentDisconnectedRequested,
                broadbandFault,
                twentyFourHourAccess,
                coopCallRequested,
                disRequested,
                isResponseRequired,
                intermittentProblem,
                notes,
                status,
                upperTrcBand,
                temporaryCallDiversionNumber,
                earliestAccessDate,
                latestAccessDate,
                structuredQuestionCode,
                symptom
        );
    }

    public TroubleReportTemplateBuilder with(ServiceProblemId serviceProblemId) {
        this.serviceProblemId = serviceProblemId;
        return this;
    }

    public TroubleReportTemplateBuilder withTroubleReportId(TroubleReportId troubleReportId) {
        this.troubleReportId = troubleReportId;
        return this;
    }

    public TroubleReportTemplateBuilder with(SnsServiceId serviceId) {
        this.serviceId = serviceId;
        return this;
    }

    public TroubleReportTemplateBuilder withLineTestSummary(LineTestSummaryDTO lineTestSummary) {
        this.lineTestSummary = lineTestSummary;
        return this;
    }

    public TroubleReportTemplateBuilder withProviderReference(String providerReference) {
        this.providerReference = providerReference;
        return this;
    }

    public TroubleReportTemplateBuilder withBtReference(String btReference) {
        this.btReference = btReference;
        return this;
    }

    public TroubleReportTemplateBuilder withDescription(String description) {
        this.description = description;
        return this;
    }

    public TroubleReportTemplateBuilder withTestProduct(TestProduct testProduct) {
        this.testProduct = testProduct;
        return this;
    }

    public TroubleReportTemplateBuilder withAppointmentReference(String appointmentReference) {
        this.appointmentReference = appointmentReference;
        return this;
    }

    public TroubleReportTemplateBuilder withAccessHazards(String accessHazards) {
        this.accessHazards = accessHazards;
        return this;
    }

    public TroubleReportTemplateBuilder withAccessNotes(String accessNotes) {
        this.accessNotes = accessNotes;
        return this;
    }

    public TroubleReportTemplateBuilder withContactName(String contactName) {
        this.contactName = contactName;
        return this;
    }

    public TroubleReportTemplateBuilder withContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
        return this;
    }

    public TroubleReportTemplateBuilder withSecondaryContactName(String secondaryContactName) {
        this.secondaryContactName = secondaryContactName;
        return this;
    }

    public TroubleReportTemplateBuilder withSecondaryContactNumber(String secondaryContactNumber) {
        this.secondaryContactNumber = secondaryContactNumber;
        return this;
    }

    public TroubleReportTemplateBuilder withCancelRequested(boolean cancelRequested) {
        this.cancelRequested = cancelRequested;
        return this;
    }

    public TroubleReportTemplateBuilder withAmendRequested(boolean amendRequested) {
        this.amendRequested = amendRequested;
        return this;
    }

    public TroubleReportTemplateBuilder withConfirmEquipmentDisconnectedRequested(boolean confirmEquipmentDisconnectedRequested) {
        this.confirmEquipmentDisconnectedRequested = confirmEquipmentDisconnectedRequested;
        return this;
    }

    public TroubleReportTemplateBuilder withBroadbandFault(boolean broadbandFault) {
        this.broadbandFault = broadbandFault;
        return this;
    }

    public TroubleReportTemplateBuilder withTwentyFourHourAccess(Boolean twentyFourHourAccess) {
        this.twentyFourHourAccess = twentyFourHourAccess;
        return this;
    }

    public TroubleReportTemplateBuilder withCoopCallRequested(Boolean coopCallRequested) {
        this.coopCallRequested = coopCallRequested;
        return this;
    }

    public TroubleReportTemplateBuilder withDisRequested(Boolean disRequested) {
        this.disRequested = disRequested;
        return this;
    }

    public TroubleReportTemplateBuilder withIsResponseRequired(Boolean isResponseRequired) {
        this.isResponseRequired = isResponseRequired;
        return this;
    }

    public TroubleReportTemplateBuilder withIntermittentProblem(Boolean intermittentProblem) {
        this.intermittentProblem = intermittentProblem;
        return this;
    }

    public TroubleReportTemplateBuilder withNotes(String notes) {
        this.notes = notes;
        return this;
    }

    public TroubleReportTemplateBuilder withStatus(TroubleReportStatus status) {
        this.status = status;
        return this;
    }

    public TroubleReportTemplateBuilder withUpperTrcBand(Integer upperTrcBand) {
        this.upperTrcBand = upperTrcBand;
        return this;
    }

    public TroubleReportTemplateBuilder withTemporaryCallDiversionNumber(String temporaryCallDiversionNumber) {
        this.temporaryCallDiversionNumber = temporaryCallDiversionNumber;
        return this;
    }

    public TroubleReportTemplateBuilder withEarliestAccessDate(Date earliestAccessDate) {
        this.earliestAccessDate = earliestAccessDate;
        return this;
    }

    public TroubleReportTemplateBuilder withLatestAccessDate(Date latestAccessDate) {
        this.latestAccessDate = latestAccessDate;
        return this;
    }

    public TroubleReportTemplateBuilder withStructuredQuestionCode(StructuredQuestionCode structuredQuestionCode) {
        this.structuredQuestionCode = structuredQuestionCode;
        return this;
    }

    public TroubleReportTemplateBuilder withSymptom(TroubleReportSymptomDTO symptom) {
        this.symptom = symptom;
        return this;
    }

    public TroubleReportTemplateBuilder with(TroubleReportAttributes attributes) {
        withDescription(attributes.valueAsString(ShortDescription));
        withTestProduct(sky.sns.spm.domain.model.troublereport.TestProduct.valueOf(attributes.valueAsString(TestProduct)));
        withAppointmentReference(attributes.valueAsString(AppointmentReference));
        withAccessHazards(attributes.valueAsString(AccessHazards));
        withAccessNotes(attributes.valueAsString(AccessNotes));
        withContactName(attributes.valueAsString(PrimaryContactName));
        withContactNumber(attributes.valueAsString(PrimaryContactNumber));
        withSecondaryContactName(attributes.valueAsString(SecondaryContactName));
        withSecondaryContactNumber(attributes.valueAsString(SecondaryContactNumber));

        withTwentyFourHourAccess(attributes.valueAsBoolean(TwentyFourHourAccess));
        withEarliestAccessDate(attributes.valueAsDate(EarliestAccessDate));
        withLatestAccessDate(attributes.valueAsDate(LatestAccessDate));

        withTemporaryCallDiversionNumber(attributes.valueAsString(TemporaryCallDiversionNumber));

        return this;
    }

    public TroubleReportTemplateBuilder withServiceType(ServiceType serviceType) {
        this.serviceType = serviceType;
        return this;
    }
}
