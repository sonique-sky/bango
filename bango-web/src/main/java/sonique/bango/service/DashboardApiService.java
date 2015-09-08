package sonique.bango.service;

import sky.sns.spm.domain.model.AgentDashboardEntry;
import sky.sns.spm.domain.model.QueueDashboardEntry;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.domain.ResponseData;

public interface DashboardApiService {
    PagedSearchResults<QueueDashboardEntry> queueDashboardEntries();

    PagedSearchResults<AgentDashboardEntry> agentDashboardEntries();
}
