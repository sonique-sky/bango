package sonique.bango.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sky.sns.spm.domain.model.diagnostic.sqc.StructuredQuestionCode;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReport;
import sonique.bango.domain.troublereport.TroubleReportTemplate;
import sonique.bango.service.TroubleReportApiService;
import spm.domain.ServiceProblemId;
import spm.domain.TroubleReportId;

import javax.annotation.Resource;
import java.util.Collection;

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
    public StructuredQuestionCode[] structuredQuestionCodes() {
        return StructuredQuestionCode.values();
    }

}
