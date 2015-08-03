package sonique.bango.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import sky.sns.spm.domain.model.troublereport.DomainTroubleReport;
import sonique.bango.service.TroubleReportApiService;
import spm.domain.ServiceProblemId;
import spm.domain.TroubleReportId;

import java.util.Collection;

@Controller
public class TroubleReportApiController {
    private final TroubleReportApiService troubleReportApiService;

    public TroubleReportApiController(TroubleReportApiService troubleReportApiService) {
        this.troubleReportApiService = troubleReportApiService;
    }

    @RequestMapping(value = "/troubleReportId/{troubleReportId}", method = RequestMethod.GET)
    @ResponseBody
    public DomainTroubleReport troubleReportFor(@PathVariable TroubleReportId troubleReportId) {
        return troubleReportApiService.troubleReportFor(troubleReportId);
    }

    @RequestMapping(value = "/serviceProblemId/{serviceProblemId}", method = RequestMethod.GET)
    @ResponseBody
    public Collection<DomainTroubleReport> troubleReportsFor(@PathVariable ServiceProblemId serviceProblemId) {
        return troubleReportApiService.troubleReportsFor(serviceProblemId);
    }
}
