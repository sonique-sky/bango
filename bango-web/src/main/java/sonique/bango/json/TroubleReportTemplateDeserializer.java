package sonique.bango.json;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import sky.sns.spm.domain.model.diagnostic.sqc.StructuredQuestionCode;
import sky.sns.spm.domain.model.refdata.ServiceType;
import sky.sns.spm.domain.model.troublereport.TestProduct;
import sky.sns.spm.domain.model.troublereport.TroubleReportStatus;
import sky.sns.spm.web.spmapp.shared.dto.LineTestSummaryDTO;
import sky.sns.spm.web.spmapp.shared.dto.TroubleReportSymptomDTO;
import sonique.bango.domain.troublereport.TroubleReportTemplate;
import sonique.bango.domain.troublereport.TroubleReportTemplateBuilder;
import spm.domain.ServiceProblemId;
import spm.domain.SnsServiceId;

import java.io.IOException;
import java.time.ZonedDateTime;
import java.util.Date;

public class TroubleReportTemplateDeserializer extends JsonDeserializer<TroubleReportTemplate> {
    @Override
    public TroubleReportTemplate deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        JsonNode jsonNode = jsonParser.getCodec().readTree(jsonParser);
        JsonNode troubleReportTemplate = jsonNode.get("troubleReportTemplate");

        ServiceProblemId serviceProblemId = new ServiceProblemId(troubleReportTemplate.get("serviceProblemId").asLong());
        String appointmentReference = troubleReportTemplate.get("appointmentReference").asText();
        boolean twentyFourHourAccess = troubleReportTemplate.get("twentyFourHourAccess").asBoolean();
        String earliestAccessDate = troubleReportTemplate.get("earliestAccessDate").asText();
        String latestAccessDate = troubleReportTemplate.get("latestAccessDate").asText();
        String serviceTypeCode = troubleReportTemplate.get("serviceType").get("code").asText();
        SnsServiceId serviceId = new SnsServiceId(troubleReportTemplate.get("serviceId").asLong());
        String providerReference = troubleReportTemplate.get("providerReference").asText();
        String btReference = troubleReportTemplate.get("btReference").asText();
        String description = troubleReportTemplate.get("description").asText();
        String accessHazards = troubleReportTemplate.get("accessHazards").asText();
        String accessNotes = troubleReportTemplate.get("accessNotes").asText();
        String contactName = troubleReportTemplate.get("contactName").asText();
        String contactNumber = troubleReportTemplate.get("contactNumber").asText();
        String secondaryContactName = troubleReportTemplate.get("secondaryContactName").asText();
        String secondaryContactNumber = troubleReportTemplate.get("secondaryContactNumber").asText();
        String notes = troubleReportTemplate.get("notes").asText();
        String temporaryCallDiversionNumber = troubleReportTemplate.get("temporaryCallDiversionNumber").asText();
        boolean cancelRequested = troubleReportTemplate.get("cancelRequested").asBoolean();
        boolean amendRequested = troubleReportTemplate.get("amendRequested").asBoolean();
        boolean confirmEquipmentDisconnectedRequested = troubleReportTemplate.get("confirmEquipmentDisconnectedRequested").asBoolean();
        boolean broadbandFault = troubleReportTemplate.get("broadbandFault").asBoolean();
        boolean coopCallRequested = troubleReportTemplate.get("coopCallRequested").asBoolean();
        boolean disRequested = troubleReportTemplate.get("disRequested").asBoolean();
        boolean isResponseRequired = troubleReportTemplate.get("isResponseRequired").asBoolean();
        boolean intermittentProblem = troubleReportTemplate.get("intermittentProblem").asBoolean();
        JsonNode symptomNode = troubleReportTemplate.get("symptom");
        TroubleReportSymptomDTO symptom = new TroubleReportSymptomDTO(
                symptomNode.get("symptomCode").asText(),
                symptomNode.get("providerCode").asText(),
                symptomNode.get("description").asText(),
                symptomNode.get("mapsToNetworkFeature").asBoolean(),
                symptomNode.get("mapToNetworkFeatureName").asText(),
                symptomNode.get("mapToNetworkFeaturePin").asText()
        );
        JsonNode lineTestSummaryNode = troubleReportTemplate.get("lineTestSummary");
        LineTestSummaryDTO lineTestSummary = new LineTestSummaryDTO(
                lineTestSummaryNode.get("lineTestReference").asText(),
                lineTestSummaryNode.get("performerReference").asText(),
                lineTestSummaryNode.get("mainFaultLocation").asText(),
                lineTestSummaryNode.get("isCompleted").asBoolean(),
                lineTestSummaryNode.get("faultReportAdvised").asBoolean(),
                lineTestSummaryNode.get("requiresAppointment").asBoolean()
        );

        StructuredQuestionCode structuredQuestionCode = null;
        if (troubleReportTemplate.hasNonNull("structuredQuestionCode")) {
            structuredQuestionCode = StructuredQuestionCode.valueOf(troubleReportTemplate.get("structuredQuestionCode").asText());
        }

        TroubleReportStatus troubleReportStatus = TroubleReportStatus.New;
        if (troubleReportTemplate.hasNonNull("status")) {
            troubleReportStatus = TroubleReportStatus.valueOf(troubleReportTemplate.get("status").asText());
        }

        TestProduct testProduct = null;
        if (troubleReportTemplate.hasNonNull("testProduct")) {
            testProduct = TestProduct.valueOf(troubleReportTemplate.get("testProduct").asText());
        }

        return new TroubleReportTemplateBuilder()
                .with(serviceProblemId)
                .withTwentyFourHourAccess(twentyFourHourAccess)
                .withEarliestAccessDate(new Date())
                .withAppointmentReference(appointmentReference)
                .withEarliestAccessDate(Date.from(ZonedDateTime.parse(earliestAccessDate).toInstant()))
                .withLatestAccessDate(Date.from(ZonedDateTime.parse(latestAccessDate).toInstant()))
                .withServiceType(ServiceType.valueOf(serviceTypeCode))
                .with(serviceId)
                .withProviderReference(providerReference)
                .withBtReference(btReference)
                .withDescription(description)
                .withAccessHazards(accessHazards)
                .withAccessNotes(accessNotes)
                .withContactName(contactName)
                .withContactNumber(contactNumber)
                .withSecondaryContactName(secondaryContactName)
                .withSecondaryContactNumber(secondaryContactNumber)
                .withNotes(notes)
                .withTemporaryCallDiversionNumber(temporaryCallDiversionNumber)
                .withCancelRequested(cancelRequested)
                .withAmendRequested(amendRequested)
                .withConfirmEquipmentDisconnectedRequested(confirmEquipmentDisconnectedRequested)
                .withBroadbandFault(broadbandFault)
                .withCoopCallRequested(coopCallRequested)
                .withDisRequested(disRequested)
                .withIsResponseRequired(isResponseRequired)
                .withIntermittentProblem(intermittentProblem)
                .withSymptom(symptom)
                .withLineTestSummary(lineTestSummary)
                .withUpperTrcBand(troubleReportTemplate.get("upperTrcBand").asInt())
                .withTestProduct(testProduct)
                .withStructuredQuestionCode(structuredQuestionCode)
                .withStatus(troubleReportStatus)
                .build();
    }
}
