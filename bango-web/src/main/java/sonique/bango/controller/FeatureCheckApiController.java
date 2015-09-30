package sonique.bango.controller;

import org.springframework.web.bind.annotation.*;
import sky.sns.spm.domain.model.featurecheck.Feature;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.bango.service.FeatureCheckApiService;
import sonique.bango.service.ServiceProblemApiService;
import spm.domain.ServiceProblemId;

import javax.annotation.Resource;

@RestController
@RequestMapping("api/featureCheck")
public class FeatureCheckApiController {
    @Resource
    private ServiceProblemApiService serviceProblemApiService;
    @Resource
    private FeatureCheckApiService featureCheckApiService;

    @RequestMapping(value = "{serviceProblemId}", method = RequestMethod.GET)
    public PagedSearchResults<Feature> featuresFor(@PathVariable Long serviceProblemId, @ModelAttribute SearchParametersDTO searchParameters) {
        DomainServiceProblem domainServiceProblem = serviceProblemApiService.serviceProblemWithId(new ServiceProblemId(serviceProblemId));

        return featureCheckApiService.features(domainServiceProblem.serviceId(), domainServiceProblem.operator(), searchParameters);
    }
}
