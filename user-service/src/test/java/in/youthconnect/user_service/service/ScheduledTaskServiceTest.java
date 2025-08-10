package in.youthconnect.user_service.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import in.org.genSpark.model.Meeting;
import in.org.genSpark.model.User;
import in.org.genSpark.repository.MeetingRepository;
import in.org.genSpark.service.EmailService;
import in.org.genSpark.service.ScheduledTaskService;

@ExtendWith(MockitoExtension.class)
class ScheduledTaskServiceTest {

	@Mock
	private MeetingRepository meetingRepository;

	@Mock
	private EmailService emailService;

	@InjectMocks
	private ScheduledTaskService scheduledTaskService;

	@Test
	void whenUpcomingMeetingsExist_thenRemindersShouldBeSent() {
		// 1. ARRANGE: Create mock data
		User proposer = new User();
		proposer.setEmail("jhasketansa86@gmail.com");
		User attendee = new User();
		attendee.setEmail("sambitwlbc2001@gmail.com");

		Meeting upcomingMeeting = new Meeting();
		upcomingMeeting.setProposer(proposer);
		upcomingMeeting.setAttendee(attendee);
		upcomingMeeting.setReminderSent(false);

		List<Meeting> meetings = Collections.singletonList(upcomingMeeting);

		// Mock the repository to return our test meeting
		when(meetingRepository.findByMeetingTimeBetweenAndConfirmedIsTrueAndReminderSentIsFalse(
				any(LocalDateTime.class), any(LocalDateTime.class))).thenReturn(meetings);

		// 2. ACT: Call the method directly
		scheduledTaskService.sendMeetingReminders();

		// 3. ASSERT: Verify the results
		// Verify that the email service was called twice (once for each user)
		verify(emailService, times(1)).sendMeetingReminderEmail("proposer@test.com", upcomingMeeting);
		verify(emailService, times(1)).sendMeetingReminderEmail("attendee@test.com", upcomingMeeting);

		// Verify that the meeting was updated and saved to prevent duplicates
		verify(meetingRepository, times(1)).save(upcomingMeeting);
		assert (upcomingMeeting.isReminderSent());
	}
}
