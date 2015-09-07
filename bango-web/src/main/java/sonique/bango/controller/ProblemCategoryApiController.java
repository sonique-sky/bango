package sonique.bango.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import sky.sns.spm.domain.model.refdata.ProblemCategory;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.domain.ResponseData;
import sonique.bango.service.ProblemCategoryApiService;

import javax.annotation.Resource;

@RestController
@RequestMapping("/api/problemCategory")
public class ProblemCategoryApiController {

    @Resource
    private ProblemCategoryApiService problemCategoryApiService;

    @RequestMapping(method = RequestMethod.GET, params = {"start", "limit"})
    public PagedSearchResults<ProblemCategory> problemCategories(@RequestParam Integer start, @RequestParam Integer limit) {
        return problemCategoryApiService.problemCategories(start, limit);
    }

    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseData<ProblemCategory> create(@RequestBody ProblemCategory problemCategory) {
        return new ResponseData<>(problemCategoryApiService.create(problemCategory));
    }

    @RequestMapping(method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseData<ProblemCategory> update(@RequestBody ProblemCategory problemCategory) {
        return new ResponseData<>(problemCategoryApiService.update(problemCategory));
    }

    @RequestMapping(method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseData<ProblemCategory> delete(@RequestBody ProblemCategory problemCategory) {
        return new ResponseData<>(problemCategoryApiService.delete(problemCategory));
    }
}
