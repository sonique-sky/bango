package sonique.bango.controller;

import org.springframework.web.bind.annotation.*;
import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.bango.service.EventHistoryApiService;
import sonique.bango.service.Reader;
import spm.domain.ServiceProblemId;

import javax.annotation.Resource;

@RestController
@RequestMapping("/api/eventHistory")
public class EventHistoryApiController {
    @Resource
    private EventHistoryApiService eventHistoryService;

    @RequestMapping(value = "/{serviceProblemId}", method = RequestMethod.GET)
    public PagedSearchResults<EventHistoryItem> eventHistory(@PathVariable Long serviceProblemId,
                                                             @ModelAttribute SearchParametersDTO searchParameters) {

        Reader.Specification<ServiceProblemId> specification = new Reader.Specification<ServiceProblemId>() {
            @Override
            public ServiceProblemId criteria() {
                return new ServiceProblemId(serviceProblemId);
            }

            @Override
            public SearchParametersDTO searchParameters() {
                return searchParameters;
            }
        };

        return eventHistoryService.read(specification);
    }
}
