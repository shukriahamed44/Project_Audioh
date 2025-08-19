package com.audio.transcriber.login;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjectDetailRepository extends JpaRepository<ProjectDetail, Long> {
    List<ProjectDetail> findByUserId(Long userId);
}