package sonique.bango.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.majorserviceproblem.DomainMajorServiceProblem;
import sky.sns.spm.domain.model.majorserviceproblem.DomainMajorServiceProblemDashboardEntry;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.bango.domain.ResponseData;
import sonique.bango.service.MspApiService;
import spm.domain.MajorServiceProblemId;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/api/msp")
public class MspApiController {

    @Resource
    private MspApiService mspApiService;

    @RequestMapping(method = RequestMethod.GET)
    public PagedSearchResults<DomainMajorServiceProblemDashboardEntry> read(@ModelAttribute SearchParametersDTO searchParameters) {
        return mspApiService.read(searchParameters);
    }

    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseData<DomainMajorServiceProblem> create(@RequestBody DomainMajorServiceProblem msp) {
        return new ResponseData<>(mspApiService.create(msp));
    }

    @RequestMapping(value = "/{majorServiceProblemId}/close", method = RequestMethod.PUT)
    public ResponseData<DomainMajorServiceProblem> close(@PathVariable Long majorServiceProblemId) {
        return new ResponseData<>(mspApiService.close(new MajorServiceProblemId(majorServiceProblemId)));
    }

    @RequestMapping(value = "/{majorServiceProblemId}/eventHistory", method = RequestMethod.GET)
    @ResponseBody
    public ResponseData<List<EventHistoryItem>> eventHistory(@PathVariable Long majorServiceProblemId) {
        return new ResponseData<>(mspApiService.eventHistory(new MajorServiceProblemId(majorServiceProblemId)));
    }

}
