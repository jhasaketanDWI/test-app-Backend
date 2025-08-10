package in.org.genSpark.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import in.org.genSpark.model.Meeting;
import in.org.genSpark.repository.MeetingRepository;
import in.org.genSpark.service.EmailService;
import in.org.genSpark.service.ScheduledTaskService;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class ScheduledTaskServiceImpl implements ScheduledTaskService {

	private final Logger logger = LoggerFactory.getLogger(ScheduledTaskService.class);

	private MeetingRepository meetingRepository;

	private EmailService emailService;

	@Autowired
	public ScheduledTaskServiceImpl(MeetingRepository meetingRepository, EmailService emailService) {

		this.meetingRepository = meetingRepository;
		this.emailService = emailService;
	}

	/**
	 * This task runs every 5 minutes to send reminders for upcoming meetings.
	 */
	@Scheduled(cron = "0 */5 * * * *")
//	@Scheduled(cron = "*/15 * * * * *")
	public void sendMeetingReminders() {
		logger.info("Running meeting reminder task...");

		LocalDateTime now = LocalDateTime.now();
		LocalDateTime reminderWindowStart = now.plusMinutes(59); // Look for meetings in 59-64 minutes
		LocalDateTime reminderWindowEnd = now.plusMinutes(64);

		// This query is the key to preventing duplicates. It only fetches meetings
		// that have NOT had a reminder sent yet.
		List<Meeting> upcomingMeetings = meetingRepository
				.findByMeetingTimeBetweenAndConfirmedIsTrueAndReminderSentIsFalse(reminderWindowStart,
						reminderWindowEnd);

		if (upcomingMeetings.isEmpty()) {
			logger.info("No upcoming meetings found needing a reminder.");
			return;
		}

		logger.info("Found {} meetings to send reminders for.", upcomingMeetings.size());

		for (Meeting meeting : upcomingMeetings) {
			// UNCOMMENTED: These lines now call the real email service.
			emailService.sendMeetingReminderEmail(meeting.getProposer().getEmail(), meeting);
			emailService.sendMeetingReminderEmail(meeting.getAttendee().getEmail(), meeting);

			// This is the crucial step that prevents duplicate emails.
			// We mark the reminder as sent in the database.
			meeting.setReminderSent(true);
			meetingRepository.save(meeting);
		}
	}
}
