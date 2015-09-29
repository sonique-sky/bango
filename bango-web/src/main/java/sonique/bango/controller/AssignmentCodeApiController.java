package sonique.bango.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sky.sns.spm.domain.model.refdata.AssignmentCode;
import sky.sns.spm.domain.model.refdata.QueueRoutingKey;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.bango.domain.ResponseData;
import sonique.bango.service.ProblemCategoryApiService;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("api/assignmentCode")
public class AssignmentCodeApiController {

    @Resource
    private ProblemCategoryApiService problemCategoryApiService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseData<Collection<AssignmentCode>> read() {
        ArrayList<AssignmentCode> assignmentCodes1 = new ArrayList<>();
        problemCategoryApiService.read(SearchParametersDTO.withNoSearchProperties(Integer.MAX_VALUE, 0)).getData()
                .stream()
                .map(problemCategory -> problemCategory.getQueueRouting().keySet())
                .map(queueRoutingKeys -> queueRoutingKeys.stream().map(QueueRoutingKey::assignmentCode).collect(toList()))
                .forEach(assignmentCodes1::addAll);


        return new ResponseData<>(
                new HashSet<>(assignmentCodes1)
        );
    }
}
