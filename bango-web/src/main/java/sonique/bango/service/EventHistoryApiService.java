package sonique.bango.service;

import sky.sns.spm.domain.model.EventHistoryItem;
import spm.domain.ServiceProblemId;

public interface EventHistoryApiService extends Reader<EventHistoryItem, ServiceProblemId> {
}
