package com.audio.transcriber.login;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, String> {

    @Query("SELECT p FROM Project p WHERE p.projectId = :projectId")
    List<Project> findByProjectId(@Param("projectId") Long projectId);
}