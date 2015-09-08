package sonique.bango.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sky.sns.spm.domain.model.AgentDashboardEntry;
import sky.sns.spm.domain.model.QueueDashboardEntry;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.service.DashboardApiService;

import javax.annotation.Resource;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardApiController {

    @Resource
    public DashboardApiService dashboardApiService;

    @RequestMapping(value = "/queue", method = RequestMethod.GET)
    public PagedSearchResults<QueueDashboardEntry> queueDashboard() {
        return dashboardApiService.queueDashboardEntries();
    }

    @RequestMapping(value = "/agent", method = RequestMethod.GET)
    public PagedSearchResults<AgentDashboardEntry> agentDashboard() {
        return dashboardApiService.agentDashboardEntries();
    }
}