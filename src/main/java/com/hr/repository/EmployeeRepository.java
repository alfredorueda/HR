package com.hr.repository;

import com.hr.domain.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Employee entity.
 */
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
