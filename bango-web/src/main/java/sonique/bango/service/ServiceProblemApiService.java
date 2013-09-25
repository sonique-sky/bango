package sonique.bango.service;

import sonique.bango.domain.EventHistoryItem;
import sonique.bango.domain.ServiceProblem;

import java.util.Collection;
import java.util.List;

public interface ServiceProblemApiService {
    Collection<ServiceProblem> serviceProblemsById(int serviceProblemId);
    ServiceProblem serviceProblemWithId(int serviceProblemId);
    List<EventHistoryItem> addNote(int serviceProblemId, String note);
    Collection<ServiceProblem> pull(int serviceProblemId);
    Collection<ServiceProblem> hold(int serviceProblemId);
    Collection<ServiceProblem> release(int serviceProblemId);
}
