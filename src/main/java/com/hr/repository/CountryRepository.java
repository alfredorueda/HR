package com.hr.repository;

import com.hr.domain.Country;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Country entity.
 */
public interface CountryRepository extends JpaRepository<Country, Long> {

}
