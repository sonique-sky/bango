package sonique.bango.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sky.sns.spm.domain.model.refdata.AssignmentCode;
import sonique.bango.domain.ResponseData;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;

@RestController
@RequestMapping("api/assignmentCode")
public class AssignmentCodeApiController {

    @RequestMapping(method = RequestMethod.GET)
    public ResponseData<List<AssignmentCode>> read() {
        return new ResponseData<>(
                newArrayList(
                        AssignmentCode.standard(),
                        new AssignmentCode("Ethan"),
                        new AssignmentCode("ROI"),
                        new AssignmentCode("Pro")
                )
        );
    }
}
