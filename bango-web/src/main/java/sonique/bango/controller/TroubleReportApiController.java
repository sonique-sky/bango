package sonique.bango.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sky.sns.spm.domain.model.RepairType;
import sky.sns.spm.domain.model.diagnostic.sqc.StructuredQuestionCode;
import sky.sns.spm.domain.model.refdata.ServiceType;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReport;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReportSymptom;
import sky.sns.spm.domain.model.troublereport.TestProduct;
import sky.sns.spm.web.spmapp.shared.dto.AvailableAppointmentDTO;
import sonique.bango.domain.troublereport.ReserveAppointment;
import sonique.bango.domain.troublereport.TroubleReportTemplate;
import sonique.bango.service.TroubleReportApiService;
import spm.domain.ServiceProblemId;
import spm.domain.TroubleReportId;

import javax.annotation.Resource;
import java.util.Collection;
import java.util.Date;

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
    public DomainTroubleReport troubleReportFor(@PathVariable TroubleReportId troubleReportId) {
        return troubleReportApiService.troubleReportWithId(troubleReportId);
    }

    @RequestMapping(value = "/serviceProblemId/{serviceProblemId}", method = GET)
    public Collection<DomainTroubleReport> troubleReportsFor(@PathVariable ServiceProblemId serviceProblemId) {
        return troubleReportApiService.troubleReportsFor(serviceProblemId);
    }

    @RequestMapping(value = "/template/serviceProblemId/{serviceProblemId}", method = GET)
    public TroubleReportTemplate troubleReportTemplateFor(@PathVariable ServiceProblemId serviceProblemId) {
        return troubleReportApiService.templateFor(serviceProblemId);
    }

    @RequestMapping(value = "/template/structuredQuestionCodes", method = GET, produces = APPLICATION_JSON_VALUE)
    public Collection<StructuredQuestionCode> structuredQuestionCodes() {
        return asList(StructuredQuestionCode.values());
    }

    @RequestMapping(value = "/template/testProducts/{serviceType}", method = GET, produces = APPLICATION_JSON_VALUE)
    public Collection<TestProduct> testProducts(@PathVariable ServiceType serviceType) {
        return TestProduct.allValidFor(serviceType);
    }

    @RequestMapping(value = "/repairTypes/{serviceType}", method = GET, produces = APPLICATION_JSON_VALUE)
    public Collection<String> repairTypesFor(@PathVariable ServiceType serviceType) {
        return RepairType.forServiceType(serviceType).stream().map(RepairType::getDescription).collect(toList());
    }

    @RequestMapping(value = "/template/symptoms/{serviceType}", method = GET, produces = APPLICATION_JSON_VALUE)
    public Collection<DomainTroubleReportSymptom> symptomsFor(@PathVariable ServiceType serviceType) {
        return troubleReportApiService.symptomsFor(serviceType);
    }

    @RequestMapping(value = "/appointments/{serviceProblemId}/{stringRepairType}/{appointmentStartDate}", method = GET, produces = APPLICATION_JSON_VALUE)
    public Collection<AvailableAppointmentDTO> appointmentsFor(
            @PathVariable ServiceProblemId serviceProblemId,
            @PathVariable String stringRepairType,
            @PathVariable Long appointmentStartDate) {

        return troubleReportApiService.availableAppointmentsFor(
                serviceProblemId,
                getRepairType(stringRepairType),
                new Date(appointmentStartDate)
        );
    }

    @RequestMapping(value = "/appointment/reserve", method = POST)
    public String reserveAppointmentFor(@RequestBody ReserveAppointment reserveAppointment) {
        return troubleReportApiService.reserveAppointmentFor(
                reserveAppointment.serviceProblemId(),
                getRepairType(reserveAppointment.repairType()),
                new Date(reserveAppointment.date()),
                valueOf(reserveAppointment.timeSlot())
        );
    }

    @RequestMapping(value = "/raise", method = POST, produces = APPLICATION_JSON_VALUE)
    public void raiseTroubleReport(@RequestBody TroubleReportTemplate troubleReportTemplate) {
        troubleReportApiService.raiseTroubleReport(troubleReportTemplate);
    }

    private static RepairType getRepairType(String stringRepairType) {
        return asList(RepairType.values())
                .stream()
                .filter(type -> type.getDescription().equals(stringRepairType))
                .findAny()
                .orElseGet(() -> RepairType.REPAIR);
    }


}
