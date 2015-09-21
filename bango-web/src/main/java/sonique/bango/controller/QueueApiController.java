package sonique.bango.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import sky.sns.spm.domain.model.refdata.Queue;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.bango.domain.ResponseData;
import sonique.bango.domain.request.BulkClearRequest;
import sonique.bango.domain.request.BulkTransferRequest;
import sonique.bango.service.QueueApiService;

import javax.annotation.Resource;

@RestController
@RequestMapping("/api/queue")
public class QueueApiController {

    @Resource
    private QueueApiService queueApiService;

    @RequestMapping(method = RequestMethod.GET)
    public PagedSearchResults<Queue> readQueues(@ModelAttribute SearchParametersDTO searchParameters) {
        return queueApiService.readQueues(searchParameters);
    }

    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseData<Queue> createQueue(@RequestBody Queue queue) {
        return new ResponseData<>(queueApiService.createQueue(queue));
    }

    @RequestMapping(method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseData<Queue> deleteQueue(@RequestBody Queue queue) {
        return new ResponseData<>(queueApiService.deleteQueue(queue));
    }

    @RequestMapping(method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseData<Queue> updateQueue(@RequestBody Queue queue) {
        return new ResponseData<>(queueApiService.updateQueue(queue));
    }

    @RequestMapping(value = "/bulkTransfer", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void bulkTransfer(@RequestBody BulkTransferRequest request) {
        queueApiService.bulkTransfer(request);
    }

    @RequestMapping(value = "/bulkClear", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void bulkClear(@RequestBody BulkClearRequest request) {
        queueApiService.bulkClear(request);
    }
}
