package sonique.bango.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sonique.bango.domain.Queue;
import sonique.bango.domain.ServiceProblem;
import sonique.bango.domain.request.BulkClearRequest;
import sonique.bango.domain.request.BulkTransferRequest;
import sonique.bango.store.QueueStore;
import sonique.bango.store.ServiceProblemStore;

import java.util.Collection;

@Controller
public class QueueDashboardApiController {

    public QueueDashboardApiController() {
    }
}