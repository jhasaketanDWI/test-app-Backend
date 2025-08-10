package in.org.genSpark.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.org.genSpark.model.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
	// Find all notifications for a specific user, ordered by most recent
	List<Notification> findByRecipientIdOrderByCreatedAtDesc(Long recipientId);
}
