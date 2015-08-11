package com.hr.repository;

import com.hr.domain.Region;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Region entity.
 */
public interface RegionRepository extends JpaRepository<Region, Long> {

}
