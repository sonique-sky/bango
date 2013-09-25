package sonique.bango.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import sonique.bango.domain.ServiceProblem;
import sonique.bango.service.SearchApiService;

import java.util.Collection;

@Controller
public class SearchApiController {

    private final SearchApiService searchApiService;

    public SearchApiController(SearchApiService searchApiService) {
        this.searchApiService = searchApiService;
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/serviceProblemId/{serviceProblemId}")
    @ResponseBody
    public Collection<ServiceProblem> serviceProblemsById(@PathVariable int serviceProblemId) {
        return searchApiService.serviceProblemById(serviceProblemId);
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/directoryNumber/{directoryNumber}")
    @ResponseBody
    public Collection<ServiceProblem> serviceProblemsByDirectoryNumber(@PathVariable String directoryNumber) {
        return searchApiService.serviceProblemByDirectoryNumber(directoryNumber);

    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/serviceId/{serviceId}")
    @ResponseBody
    public Collection<ServiceProblem> serviceProblemsByServiceId(@PathVariable String serviceId) {
        return searchApiService.serviceProblemsByServiceId(serviceId);
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/mspId/{mspId}")
    @ResponseBody
    public Collection<ServiceProblem> serviceProblemsByMspId(@PathVariable String mspId) {
        return searchApiService.serviceProblemsByMspId(mspId);
    }
}
