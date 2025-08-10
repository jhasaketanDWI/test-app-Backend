package in.org.genSpark.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.org.genSpark.model.Meeting;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {
	// We can add queries here to find upcoming meetings for a user.
	List<Meeting> findByMeetingTimeBetweenAndConfirmedIsTrueAndReminderSentIsFalse(LocalDateTime start,
			LocalDateTime end);

}
