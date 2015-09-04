package sonique.bango.service;

import sky.sns.spm.domain.model.QueueDashboardEntry;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.domain.ResponseData;

public interface QueueDashboardApiService {
    PagedSearchResults<QueueDashboardEntry> dashboardEntries();
}
