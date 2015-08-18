package sonique.bango.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.service.SearchApiService;
import spm.domain.ServiceProblemId;
import spm.domain.SnsServiceId;
import spm.messages.bt.types.DirectoryNumber;

import javax.annotation.Resource;

@Controller
@RequestMapping("/api/search")
public class SearchApiController {

    @Resource
    private SearchApiService searchApiService;

    @RequestMapping(method = {RequestMethod.GET}, value = "/serviceProblemId/{serviceProblemId}")
    @ResponseBody
    public PagedSearchResults<DomainServiceProblem> serviceProblemsById(@PathVariable Long serviceProblemId) {
        return searchApiService.serviceProblemById(new ServiceProblemId(serviceProblemId));
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/directoryNumber/{directoryNumber}")
    @ResponseBody
    public PagedSearchResults<DomainServiceProblem> serviceProblemsByDirectoryNumber(@PathVariable String directoryNumber) {
        return searchApiService.serviceProblemByDirectoryNumber(new DirectoryNumber(directoryNumber));

    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/serviceId/{serviceId}")
    @ResponseBody
    public PagedSearchResults<DomainServiceProblem> serviceProblemsByServiceId(@PathVariable String serviceId) {
        return searchApiService.serviceProblemsByServiceId(new SnsServiceId(serviceId));
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/mspId/{mspId}")
    @ResponseBody
    public PagedSearchResults<DomainServiceProblem> serviceProblemsByMspId(@PathVariable String mspId) {
        return searchApiService.serviceProblemsByMspId(mspId);
    }
}
