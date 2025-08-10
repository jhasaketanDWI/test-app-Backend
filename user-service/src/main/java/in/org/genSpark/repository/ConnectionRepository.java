package in.org.genSpark.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.org.genSpark.model.Connection;

@Repository
public interface ConnectionRepository extends JpaRepository<Connection, Long> {
	// Custom query to check if a connection already exists between two users.
	boolean existsByInvestorIdAndEntrepreneurId(Long investorId, Long entrepreneurId);
}