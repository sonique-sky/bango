package sonique.bango.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sky.sns.spm.web.spmapp.shared.dto.LineTestSummaryDTO;
import sonique.bango.service.LineTestApiService;
import spm.domain.SnsServiceId;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/api/lineTest")
public class LineTestApiController {

    @Resource
    private LineTestApiService lineTestApiService;

    @RequestMapping(value = "/{serviceId}", method = RequestMethod.GET)
    public List<LineTestSummaryDTO> troubleReportFor(@PathVariable Long serviceId) {
        return lineTestApiService.lineTestsFor(new SnsServiceId(serviceId));
    }

}
