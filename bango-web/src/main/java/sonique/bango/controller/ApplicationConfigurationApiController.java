package sonique.bango.controller;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sky.sns.spm.domain.model.refdata.ProblemCategory;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.domain.RequestParameters;
import sonique.bango.service.ApplicationConfigurationApiService;

import javax.annotation.Resource;

@RestController
@RequestMapping("/api/configuration")
public class ApplicationConfigurationApiController {

    @Resource
    public ApplicationConfigurationApiService configurationApiService;

    @RequestMapping(method = {RequestMethod.GET})
    public PagedSearchResults<ProblemCategory> problemCategory(@ModelAttribute RequestParameters requestParameters) {
        return configurationApiService.problemCategory(requestParameters);
    }

}
