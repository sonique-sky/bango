package sonique.bango.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import sonique.bango.domain.sorter.JsonSortDataParameterParser;
import sonique.bango.domain.sorter.Sort;

@ControllerAdvice
@EnableWebMvc
public class WebDataInitBinderSupport {
    private JsonSortDataParameterParser sortDataParameterParser;

    @Autowired
    public void setObjectMapper(ObjectMapper objectMapper) {
        sortDataParameterParser = new JsonSortDataParameterParser(objectMapper);
    }

    @InitBinder({"sort"})
    public void initBinder(final WebDataBinder webDataBinder) {
        webDataBinder.registerCustomEditor(Sort[].class, sortDataParameterParser);
    }
}
