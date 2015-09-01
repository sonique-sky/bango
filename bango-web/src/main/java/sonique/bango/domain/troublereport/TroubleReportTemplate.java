package sonique.bango.domain.troublereport;

import sky.sns.spm.domain.model.diagnostic.sqc.StructuredQuestionCode;
import sky.sns.spm.domain.model.refdata.ServiceType;
import sky.sns.spm.domain.model.troublereport.TestProduct;
import sky.sns.spm.domain.model.troublereport.TroubleReportStatus;
import sky.sns.spm.web.spmapp.shared.dto.LineTestSummaryDTO;
import sky.sns.spm.web.spmapp.shared.dto.TroubleReportSymptomDTO;
import spm.domain.ServiceProblemId;
import spm.domain.SnsServiceId;
import spm.domain.TroubleReportId;

import java.util.Date;

public class TroubleReportTemplate {

    private final ServiceProblemId serviceProblemId;
    private final ServiceType serviceType;
    private final TroubleReportId troubleReportId;
    private final SnsServiceId serviceId;
    private final LineTestSummaryDTO lineTestSummary;
    private final String providerReference;
    private final String btReference;
    private final String description;
    private final TestProduct testProduct;
    private final String appointmentReference;
    private final String accessHazards;
    private final String accessNotes;
    private final String contactName;
    private final String contactNumber;
    private final String secondaryContactName;
    private final String secondaryContactNumber;
    private final boolean cancelRequested;
    private final boolean amendRequested;
    private final boolean confirmEquipmentDisconnectedRequested;
    private final boolean broadbandFault;
    private final Boolean twentyFourHourAccess;
    private final Boolean coopCallRequested;
    private final Boolean disRequested;
    private final Boolean isResponseRequired;
    private final Boolean intermittentProblem;
    private final String notes;
    private final TroubleReportStatus status;
    private final Integer upperTrcBand;
    private final String temporaryCallDiversionNumber;
    private final Date earliestAccessDate;
    private final Date latestAccessDate;
    private final StructuredQuestionCode structuredQuestionCode;
    private final TroubleReportSymptomDTO symptom;

    public TroubleReportTemplate(
            ServiceProblemId serviceProblemId,
            ServiceType serviceType,
            TroubleReportId troubleReportId,
            SnsServiceId serviceId,
            LineTestSummaryDTO lineTestSummary,
            String providerReference,
            String btReference,
            String description,
            TestProduct testProduct,
            String appointmentReference,
            String accessHazards,
            String accessNotes,
            String contactName,
            String contactNumber,
            String secondaryContactName,
            String secondaryContactNumber,
            boolean cancelRequested,
            boolean amendRequested,
            boolean confirmEquipmentDisconnectedRequested,
            boolean broadbandFault,
            Boolean twentyFourHourAccess,
            Boolean coopCallRequested,
            Boolean disRequested,
            Boolean isResponseRequired,
            Boolean intermittentProblem,
            String notes,
            TroubleReportStatus status,
            Integer upperTrcBand,
            String temporaryCallDiversionNumber,
            Date earliestAccessDate,
            Date latestAccessDate,
            StructuredQuestionCode structuredQuestionCode,
            TroubleReportSymptomDTO symptom) {
        this.serviceProblemId = serviceProblemId;
        this.serviceType = serviceType;
        this.troubleReportId = troubleReportId;
        this.serviceId = serviceId;
        this.lineTestSummary = lineTestSummary;
        this.providerReference = providerReference;
        this.btReference = btReference;
        this.description = description;
        this.testProduct = testProduct;
        this.appointmentReference = appointmentReference;
        this.accessHazards = accessHazards;
        this.accessNotes = accessNotes;
        this.contactName = contactName;
        this.contactNumber = contactNumber;
        this.secondaryContactName = secondaryContactName;
        this.secondaryContactNumber = secondaryContactNumber;
        this.cancelRequested = cancelRequested;
        this.amendRequested = amendRequested;
        this.confirmEquipmentDisconnectedRequested = confirmEquipmentDisconnectedRequested;
        this.broadbandFault = broadbandFault;
        this.twentyFourHourAccess = twentyFourHourAccess;
        this.coopCallRequested = coopCallRequested;
        this.disRequested = disRequested;
        this.isResponseRequired = isResponseRequired;
        this.intermittentProblem = intermittentProblem;
        this.notes = notes;
        this.status = status;
        this.upperTrcBand = upperTrcBand;
        this.temporaryCallDiversionNumber = temporaryCallDiversionNumber;
        this.earliestAccessDate = earliestAccessDate;
        this.latestAccessDate = latestAccessDate;
        this.structuredQuestionCode = structuredQuestionCode;
        this.symptom = symptom;
    }

    public ServiceProblemId serviceProblemId() {
        return serviceProblemId;
    }

    public TroubleReportId troubleReportId() {
        return troubleReportId;
    }

    public SnsServiceId serviceId() {
        return serviceId;
    }

    public LineTestSummaryDTO lineTestSummary() {
        return lineTestSummary;
    }

    public String providerReference() {
        return providerReference;
    }

    public String btReference() {
        return btReference;
    }

    public String description() {
        return description;
    }

    public TestProduct testProduct() {
        return testProduct;
    }

    public String appointmentReference() {
        return appointmentReference;
    }

    public String accessHazards() {
        return accessHazards;
    }

    public String accessNotes() {
        return accessNotes;
    }

    public String contactName() {
        return contactName;
    }

    public String contactNumber() {
        return contactNumber;
    }

    public String secondaryContactName() {
        return secondaryContactName;
    }

    public String secondaryContactNumber() {
        return secondaryContactNumber;
    }

    public boolean cancelRequested() {
        return cancelRequested;
    }

    public boolean amendRequested() {
        return amendRequested;
    }

    public boolean confirmEquipmentDisconnectedRequested() {
        return confirmEquipmentDisconnectedRequested;
    }

    public boolean broadbandFault() {
        return broadbandFault;
    }

    public Boolean twentyFourHourAccess() {
        return twentyFourHourAccess;
    }

    public Boolean coopCallRequested() {
        return coopCallRequested;
    }

    public Boolean disRequested() {
        return disRequested;
    }

    public Boolean isResponseRequired() {
        return isResponseRequired;
    }

    public Boolean intermittentProblem() {
        return intermittentProblem;
    }

    public String notes() {
        return notes;
    }

    public TroubleReportStatus status() {
        return status;
    }

    public Integer upperTrcBand() {
        return upperTrcBand;
    }

    public String temporaryCallDiversionNumber() {
        return temporaryCallDiversionNumber;
    }

    public Date earliestAccessDate() {
        return earliestAccessDate;
    }

    public Date latestAccessDate() {
        return latestAccessDate;
    }

    public StructuredQuestionCode structuredQuestionCode() {
        return structuredQuestionCode;
    }

    public TroubleReportSymptomDTO symptom() {
        return symptom;
    }

    public ServiceType serviceType() {
        return serviceType;
    }
}
