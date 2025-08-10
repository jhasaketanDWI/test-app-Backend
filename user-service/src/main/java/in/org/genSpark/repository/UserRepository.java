package in.org.genSpark.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.org.genSpark.enums.Role;
import in.org.genSpark.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);

	Optional<User> findByPhone(String phone);

	boolean existsByRole(Role role);

	boolean existsByEmail(String email);

}
