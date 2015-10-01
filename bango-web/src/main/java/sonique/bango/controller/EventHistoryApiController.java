package sonique.bango.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.bango.service.EventHistoryApiService;
import sonique.bango.service.Reader;
import spm.domain.ServiceProblemId;

import javax.annotation.Resource;

@Controller
@RequestMapping("/api/eventHistory")
public class EventHistoryApiController {
    @Resource
    private EventHistoryApiService eventHistoryService;

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public PagedSearchResults<EventHistoryItem> eventHistory(@RequestParam Long entityIdentifier,
                                                             @ModelAttribute SearchParametersDTO searchParameters) {

        Reader.Specification<ServiceProblemId> specification = new Reader.Specification<ServiceProblemId>() {
            @Override
            public ServiceProblemId criteria() {
                return new ServiceProblemId(entityIdentifier);
            }

            @Override
            public SearchParametersDTO searchParameters() {
                return searchParameters;
            }
        };

        return eventHistoryService.read(specification);
    }
}
