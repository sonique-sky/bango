package sonique.bango.controller;

import com.google.common.collect.Lists;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import sonique.bango.domain.Agent;
import sonique.bango.domain.Queue;
import sonique.bango.store.AgentStore;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import static com.google.common.collect.Lists.newArrayList;

@Controller
public class AgentApiController {

    private final AgentStore agentStore;

    public AgentApiController(AgentStore agentStore) {
        this.agentStore = agentStore;
    }

    @RequestMapping(method = {RequestMethod.GET}, value = "/authenticatedAgent")
    @ResponseBody
    public Agent authenticatedAgent(HttpServletResponse response, HttpSession session) {
        return new Agent("foo.foo", Lists.<Queue>newArrayList());

//                agentStore.agentFor(session.getId());
//
//        response.setStatus(200);
    }
}
