package sonique.bango.controller;

import org.springframework.web.bind.annotation.*;
import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.RepairType;
import sky.sns.spm.domain.model.diagnostic.sqc.StructuredQuestionCode;
import sky.sns.spm.domain.model.refdata.ServiceType;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReport;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReportSymptom;
import sky.sns.spm.domain.model.troublereport.TestProduct;
import sky.sns.spm.web.spmapp.shared.dto.AvailableAppointmentDTO;
import sonique.bango.domain.ResponseData;
import sonique.bango.domain.troublereport.ReserveAppointment;
import sonique.bango.domain.troublereport.TroubleReportTemplate;
import sonique.bango.service.TroubleReportApiService;
import spm.domain.ServiceProblemId;
import spm.domain.TroubleReportId;

import javax.annotation.Resource;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Map;

import static java.util.Arrays.asList;
import static java.util.stream.Collectors.toList;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static spm.pacman.domain.AppointmentTimeslot.valueOf;

@RestController
@RequestMapping("/api/troubleReport")
public class TroubleReportApiController {

    @Resource
    private TroubleReportApiService troubleReportApiService;

    @RequestMapping(value = "/troubleReportId/{troubleReportId}", method = GET)
    public ResponseData<DomainTroubleReport> troubleReportFor(@PathVariable TroubleReportId troubleReportId) {
        return new ResponseData<>(troubleReportApiService.troubleReportWithId(troubleReportId));
    }

    @RequestMapping(value = "/serviceProblemId/{serviceProblemId}", method = GET)
    public ResponseData<Collection<DomainTroubleReport>> troubleReportsFor(@PathVariable ServiceProblemId serviceProblemId) {
        return new ResponseData<>(troubleReportApiService.troubleReportsFor(serviceProblemId));
    }

    @RequestMapping(value = "/template/serviceProblemId/{serviceProblemId}", method = GET)
    public ResponseData<TroubleReportTemplate> troubleReportTemplateFor(@PathVariable ServiceProblemId serviceProblemId) {
        return new ResponseData<>(troubleReportApiService.templateFor(serviceProblemId));
    }

    @RequestMapping(value = "/{troubleReportId}/eventHistory", method = RequestMethod.GET)
    @ResponseBody
    public ResponseData<List<EventHistoryItem>> eventHistory(@PathVariable Long troubleReportId) {
        return new ResponseData<>(troubleReportApiService.eventHistory(new TroubleReportId(troubleReportId)));
    }

    @RequestMapping(value = "/template/structuredQuestionCodes", method = GET, produces = APPLICATION_JSON_VALUE)
    public ResponseData<Collection<StructuredQuestionCode>> structuredQuestionCodes() {
        return new ResponseData<>(asList(StructuredQuestionCode.values()));
    }

    @RequestMapping(value = "/template/testProducts/{serviceType}", method = GET, produces = APPLICATION_JSON_VALUE)
    public ResponseData<Collection<TestProduct>> testProducts(@PathVariable ServiceType serviceType) {
        return new ResponseData<>(TestProduct.allValidFor(serviceType));
    }

    @RequestMapping(value = "/repairTypes/{serviceType}", method = GET, produces = APPLICATION_JSON_VALUE)
    public ResponseData<Collection<String>> repairTypesFor(@PathVariable ServiceType serviceType) {
        return new ResponseData<>(
                RepairType.forServiceType(serviceType)
                        .stream()
                        .map(RepairType::getDescription)
                        .collect(toList())
        );
    }

    @RequestMapping(value = "/template/symptoms/{serviceType}", method = GET, produces = APPLICATION_JSON_VALUE)
    public ResponseData<Collection<DomainTroubleReportSymptom>> symptomsFor(@PathVariable ServiceType serviceType) {
        return new ResponseData<>(troubleReportApiService.symptomsFor(serviceType));
    }

    @RequestMapping(value = "/appointments/{serviceProblemId}/{stringRepairType}/{appointmentStartDate}", method = GET, produces = APPLICATION_JSON_VALUE)
    public ResponseData<Collection<AvailableAppointmentDTO>> appointmentsFor(
            @PathVariable ServiceProblemId serviceProblemId,
            @PathVariable String stringRepairType,
            @PathVariable Long appointmentStartDate) {

        return new ResponseData<>(troubleReportApiService.availableAppointmentsFor(
                serviceProblemId,
                getRepairType(stringRepairType),
                new Date(appointmentStartDate)
        ));
    }

    @RequestMapping(value = "/appointment/reserve", method = POST)
    public ResponseData<String> reserveAppointmentFor(@RequestBody ReserveAppointment reserveAppointment) {
        return new ResponseData<>(troubleReportApiService.reserveAppointmentFor(
                reserveAppointment.serviceProblemId(),
                getRepairType(reserveAppointment.repairType()),
                new Date(reserveAppointment.date()),
                valueOf(reserveAppointment.timeSlot())
        ));
    }

    @RequestMapping(value = "/raise", method = POST, produces = APPLICATION_JSON_VALUE)
    public void raiseTroubleReport(@RequestBody TroubleReportTemplate troubleReportTemplate) {
        troubleReportApiService.raiseTroubleReport(troubleReportTemplate);
    }

    @RequestMapping(value = "/amend", method = POST, produces = APPLICATION_JSON_VALUE)
    public void amendTroubleReport(@RequestBody TroubleReportTemplate troubleReportTemplate) {
        troubleReportApiService.amendTroubleReport(troubleReportTemplate);
    }

    @RequestMapping(value = "/{troubleReportId}/cancel", method = POST, produces = APPLICATION_JSON_VALUE)
    public ResponseData<DomainTroubleReport> cancelTroubleReport(@PathVariable Long troubleReportId, @RequestBody Map<String, String> payloadMap) {
        String cancellationReason = payloadMap.get("cancellationReason");
        return new ResponseData<>(troubleReportApiService.cancelTroubleReport(new TroubleReportId(troubleReportId), cancellationReason));
    }

    @RequestMapping(value = "/{troubleReportId}/confirmEquipmentDisconnected", method = RequestMethod.POST)
    @ResponseBody
    public void confirmEquipmentDisconnected(@PathVariable Long troubleReportId) {
        troubleReportApiService.confirmEquipmentDisconnected(new TroubleReportId(troubleReportId));
    }

    private static RepairType getRepairType(String stringRepairType) {
        return asList(RepairType.values())
                .stream()
                .filter(type -> type.getDescription().equals(stringRepairType))
                .findAny()
                .orElseGet(() -> RepairType.REPAIR);
    }

}
