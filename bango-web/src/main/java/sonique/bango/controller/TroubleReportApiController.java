package sonique.bango.controller;

import org.springframework.web.bind.annotation.*;
import sky.sns.spm.domain.model.RepairType;
import sky.sns.spm.domain.model.diagnostic.sqc.StructuredQuestionCode;
import sky.sns.spm.domain.model.refdata.ServiceType;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReport;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReportSymptom;
import sky.sns.spm.domain.model.troublereport.TestProduct;
import sky.sns.spm.web.spmapp.shared.dto.AvailableAppointmentDTO;
import sonique.bango.domain.troublereport.TroubleReportTemplate;
import sonique.bango.service.TroubleReportApiService;
import spm.domain.ServiceProblemId;
import spm.domain.TroubleReportId;

import javax.annotation.Resource;
import java.util.Collection;
import java.util.Date;

import static java.util.Arrays.asList;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api/troubleReport")
public class TroubleReportApiController {

    @Resource
    private TroubleReportApiService troubleReportApiService;

    @RequestMapping(value = "/troubleReportId/{troubleReportId}", method = RequestMethod.GET)
    public DomainTroubleReport troubleReportFor(@PathVariable TroubleReportId troubleReportId) {
        return troubleReportApiService.troubleReportWithId(troubleReportId);
    }

    @RequestMapping(value = "/serviceProblemId/{serviceProblemId}", method = RequestMethod.GET)
    public Collection<DomainTroubleReport> troubleReportsFor(@PathVariable ServiceProblemId serviceProblemId) {
        return troubleReportApiService.troubleReportsFor(serviceProblemId);
    }

    @RequestMapping(value = "/template/serviceProblemId/{serviceProblemId}", method = RequestMethod.GET)
    public TroubleReportTemplate troubleReportTemplateFor(@PathVariable ServiceProblemId serviceProblemId) {
        return troubleReportApiService.templateFor(serviceProblemId);
    }

    @RequestMapping(value = "/template/structuredQuestionCodes", method = RequestMethod.GET, produces = APPLICATION_JSON_VALUE)
    public Collection<StructuredQuestionCode> structuredQuestionCodes() {
        return asList(StructuredQuestionCode.values());
    }

    @RequestMapping(value = "/template/testProducts/{serviceType}", method = RequestMethod.GET, produces = APPLICATION_JSON_VALUE)
    public Collection<TestProduct> testProducts(@PathVariable ServiceType serviceType) {
        return TestProduct.allValidFor(serviceType);
    }

    @RequestMapping(value = "/template/symptoms/{serviceType}", method = RequestMethod.GET, produces = APPLICATION_JSON_VALUE)
    public Collection<DomainTroubleReportSymptom> symptomsFor(@PathVariable ServiceType serviceType) {
        return troubleReportApiService.symptomsFor(serviceType);
    }

    @RequestMapping(value = "/appointments/{serviceProblemId}/{stringRepairType}/{appointmentStartDate}", method = RequestMethod.GET, produces = APPLICATION_JSON_VALUE)
    public Collection<AvailableAppointmentDTO> appointmentsFor(
            @PathVariable ServiceProblemId serviceProblemId,
            @PathVariable String stringRepairType,
            @PathVariable Long appointmentStartDate) {

        RepairType repairType = asList(RepairType.values())
                .stream()
                .filter(type -> type.getDescription().equals(stringRepairType))
                .findAny()
                .orElseGet(() -> RepairType.REPAIR);

        return troubleReportApiService.availableAppointmentsFor(serviceProblemId, repairType, new Date(appointmentStartDate));
    }

    @RequestMapping(value = "/raise", method = RequestMethod.POST, produces = APPLICATION_JSON_VALUE)
    public void raiseTroubleReport(@RequestBody TroubleReportTemplate troubleReportTemplate) {
        troubleReportApiService.raiseTroubleReport(troubleReportTemplate);
    }


}
