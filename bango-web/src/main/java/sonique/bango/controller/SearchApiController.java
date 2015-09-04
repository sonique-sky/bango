package sonique.bango.controller;

import org.springframework.web.bind.annotation.*;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.service.SearchApiService;
import spm.domain.ServiceProblemId;
import spm.domain.SnsServiceId;
import spm.messages.bt.types.DirectoryNumber;

import javax.annotation.Resource;

@RestController
@RequestMapping("/api/search")
public class SearchApiController {

    @Resource
    private SearchApiService searchApiService;

    @RequestMapping(method = {RequestMethod.GET}, value = "/serviceProblemId/{serviceProblemId}")
    public PagedSearchResults<DomainServiceProblem> serviceProblemsById(@PathVariable Long serviceProblemId) {
        return searchApiService.serviceProblemById(new ServiceProblemId(serviceProblemId));
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/directoryNumber/{directoryNumber}")
    public PagedSearchResults<DomainServiceProblem> serviceProblemsByDirectoryNumber(@PathVariable String directoryNumber) {
        return searchApiService.serviceProblemByDirectoryNumber(new DirectoryNumber(directoryNumber));

    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/serviceId/{serviceId}", params = {"start", "limit"})
    public PagedSearchResults<DomainServiceProblem> serviceProblemsByServiceId(@PathVariable String serviceId, @RequestParam Integer start, @RequestParam Integer limit) {
        return searchApiService.serviceProblemsByServiceId(new SnsServiceId(serviceId), start, limit);
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/mspId/{mspId}")
    public PagedSearchResults<DomainServiceProblem> serviceProblemsByMspId(@PathVariable String mspId) {
        return searchApiService.serviceProblemsByMspId(mspId);
    }
}
