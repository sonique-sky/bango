package sonique.bango.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import sky.sns.spm.domain.model.refdata.PresentedServiceType;
import sky.sns.spm.domain.model.refdata.ProblemCategory;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.bango.domain.ResponseData;
import sonique.bango.service.ProblemCategoryApiService;

import javax.annotation.Resource;
import java.util.List;

import static java.util.Arrays.asList;

@RestController
@RequestMapping("/api/problemCategory")
public class ProblemCategoryApiController {

    @Resource
    private ProblemCategoryApiService problemCategoryApiService;

    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseData<ProblemCategory> create(@RequestBody ProblemCategory problemCategory) {
        return new ResponseData<>(problemCategoryApiService.create(problemCategory));
    }

    @RequestMapping(method = RequestMethod.GET)
    public PagedSearchResults<ProblemCategory> read(@ModelAttribute SearchParametersDTO searchParameters) {
        return problemCategoryApiService.read(searchParameters);
    }

    @RequestMapping(method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseData<ProblemCategory> update(@RequestBody ProblemCategory problemCategory) {
        return new ResponseData<>(problemCategoryApiService.update(problemCategory));
    }

    @RequestMapping(method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseData<ProblemCategory> delete(@RequestBody ProblemCategory problemCategory) {
        return new ResponseData<>(problemCategoryApiService.delete(problemCategory));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/serviceTypes")
    public ResponseData<List<PresentedServiceType>> serviceTypes(@ModelAttribute SearchParametersDTO searchParameters) {
        return new ResponseData<>(asList(PresentedServiceType.values()));
    }

}
