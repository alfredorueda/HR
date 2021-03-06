package com.hr.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hr.domain.Department;
import com.hr.repository.DepartmentRepository;
import com.hr.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Department.
 */
@RestController
@RequestMapping("/api")
public class DepartmentResource {

    private final Logger log = LoggerFactory.getLogger(DepartmentResource.class);

    @Inject
    private DepartmentRepository departmentRepository;

    /**
     * POST  /departments -> Create a new department.
     */
    @RequestMapping(value = "/departments",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Department> create(@RequestBody Department department) throws URISyntaxException {
        log.debug("REST request to save Department : {}", department);
        if (department.getId() != null) {
            return ResponseEntity.badRequest().header("Failure", "A new department cannot already have an ID").body(null);
        }
        Department result = departmentRepository.save(department);
        return ResponseEntity.created(new URI("/api/departments/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert("department", result.getId().toString()))
                .body(result);
    }

    /**
     * PUT  /departments -> Updates an existing department.
     */
    @RequestMapping(value = "/departments",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Department> update(@RequestBody Department department) throws URISyntaxException {
        log.debug("REST request to update Department : {}", department);
        if (department.getId() == null) {
            return create(department);
        }
        Department result = departmentRepository.save(department);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert("department", department.getId().toString()))
                .body(result);
    }

    /**
     * GET  /departments -> get all the departments.
     */
    @RequestMapping(value = "/departments",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Department> getAll() {
        log.debug("REST request to get all Departments");
        return departmentRepository.findAll();
    }

    /**
     * GET  /departments/:id -> get the "id" department.
     */
    @RequestMapping(value = "/departments/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Department> get(@PathVariable Long id) {
        log.debug("REST request to get Department : {}", id);
        return Optional.ofNullable(departmentRepository.findOne(id))
            .map(department -> new ResponseEntity<>(
                department,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /departments/:id -> delete the "id" department.
     */
    @RequestMapping(value = "/departments/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        log.debug("REST request to delete Department : {}", id);
        departmentRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("department", id.toString())).build();
    }
}
