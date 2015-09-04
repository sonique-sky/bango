package sonique.bango.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sky.sns.spm.domain.model.QueueDashboardEntry;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.domain.ResponseData;
import sonique.bango.service.QueueDashboardApiService;

import javax.annotation.Resource;

@RestController
@RequestMapping("/api/queueDashboard")
public class QueueDashboardApiController {

    @Resource
    public QueueDashboardApiService queueDashboardApiService;

    @RequestMapping(method = RequestMethod.GET)
    public PagedSearchResults<QueueDashboardEntry> queueDashboard() {
        return queueDashboardApiService.dashboardEntries();
    }
}