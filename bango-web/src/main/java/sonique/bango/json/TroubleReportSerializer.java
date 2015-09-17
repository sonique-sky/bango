package sonique.bango.json;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReport;

import java.io.IOException;

public class TroubleReportSerializer extends JsonSerializer<DomainTroubleReport> {
    @Override
    public void serialize(DomainTroubleReport troubleReport, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("troubleReportId", troubleReport.getTroubleReportId().asInteger());
        jsonGenerator.writeNumberField("serviceId", troubleReport.getServiceId().asLong());
        jsonGenerator.writeStringField("btRef", troubleReport.getBtReference());
        jsonGenerator.writeStringField("providerRef", troubleReport.providerReference().asString());

        jsonGenerator.writeStringField("status", troubleReport.getStatus().name());
        jsonGenerator.writeStringField("contactName", troubleReport.getContactName().asString());
        jsonGenerator.writeStringField("contactNumber", troubleReport.getContactNumber().asString());

        if (troubleReport.getSecondaryContactName() != null) {
            jsonGenerator.writeStringField("secondaryContactName", troubleReport.getSecondaryContactName().asString());
        } else {
            jsonGenerator.writeNullField("secondaryContactName");
        }

        if (troubleReport.getSecondaryContactNumber() != null) {
            jsonGenerator.writeStringField("secondaryContactNumber", troubleReport.getSecondaryContactNumber().asString());
        } else {
            jsonGenerator.writeNullField("secondaryContactNumber");
        }

        if (troubleReport.getTemporaryCallDiversionNumber() != null) {
            jsonGenerator.writeStringField("tempCallDiversionNumber", troubleReport.getTemporaryCallDiversionNumber().asString());
        } else {
            jsonGenerator.writeNullField("tempCallDiversionNumber");
        }

        if (troubleReport.getAccessHazards() != null) {
            jsonGenerator.writeStringField("accessHazards", troubleReport.getAccessHazards());
        } else {
            jsonGenerator.writeNullField("accessHazards");
        }

        if (troubleReport.getAccessNotes() != null) {
            jsonGenerator.writeStringField("accessNotes", troubleReport.getAccessNotes().asString());
        } else {
            jsonGenerator.writeNullField("accessNotes");
        }

        if (troubleReport.twentyFourHourAccess() != null) {
            jsonGenerator.writeStringField("twentyFourHourAccess", troubleReport.twentyFourHourAccess().asString());
        } else {
            jsonGenerator.writeNullField("twentyFourHourAccess");
        }

        if (troubleReport.getShortDescription() != null) {
            jsonGenerator.writeStringField("shortDescription", troubleReport.getShortDescription().asString());
        } else {
            jsonGenerator.writeNullField("shortDescription");
        }

        if (troubleReport.getAppointmentReference() != null) {
            jsonGenerator.writeStringField("appointmentReference", troubleReport.getAppointmentReference());
        } else {
            jsonGenerator.writeNullField("appointmentReference");
        }

        if (troubleReport.getTestProduct() != null) {
            jsonGenerator.writeStringField("testProduct", troubleReport.getTestProduct().asString());
        } else {
            jsonGenerator.writeNullField("testProduct");
        }

        if (troubleReport.getSymptom() != null) {
            jsonGenerator.writeObjectField("symptom", troubleReport.getSymptom().getSymptomCode());
        } else {
            jsonGenerator.writeNullField("symptom");
        }

        if (troubleReport.getLineTestReference() != null) {
            jsonGenerator.writeObjectField("diagnosticId", troubleReport.getLineTestReference().asString());
        } else {
            jsonGenerator.writeNullField("diagnosticId");
        }

        if (troubleReport.getUpperTrcBand() != null) {
            jsonGenerator.writeObjectField("trcBand", troubleReport.getUpperTrcBand());
        } else {
            jsonGenerator.writeNullField("trcBand");
        }

        if (troubleReport.getNotes() != null) {
            jsonGenerator.writeObjectField("notes", troubleReport.getNotes());
        } else {
            jsonGenerator.writeNullField("notes");
        }

        jsonGenerator.writeBooleanField("disRequested", troubleReport.getDisRequested());
        jsonGenerator.writeBooleanField("confirmEquipmentDisconnectRequested", troubleReport.isConfirmEquipmentDisconnectedRequested());
        jsonGenerator.writeBooleanField("cancelRequested", troubleReport.isCancelRequested());
        jsonGenerator.writeBooleanField("amendRequested", troubleReport.isAmendRequested());

        jsonGenerator.writeEndObject();

    }
}
