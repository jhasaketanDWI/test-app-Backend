package in.org.genSpark.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.org.genSpark.model.Pitch;

@Repository
public interface PitchRepository extends JpaRepository<Pitch, Long> {
	// We can add custom queries here later, e.g., to find pitches by industry.
	// List<Pitch> findByIndustry(String industry);
}
