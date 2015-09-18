package sonique.bango.controller;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sky.sns.spm.domain.model.majorserviceproblem.DomainMajorServiceProblemDashboardEntry;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.domain.RequestParameters;
import sonique.bango.service.MspApiService;

import javax.annotation.Resource;

@RestController
@RequestMapping("/api/msp")
public class MspApiController {

    @Resource
    private MspApiService mspApiService;

    @RequestMapping(method = RequestMethod.GET)
    public PagedSearchResults<DomainMajorServiceProblemDashboardEntry> dashboardEntry(@ModelAttribute RequestParameters params) {
        return mspApiService.serviceProblems(params);
    }
}
