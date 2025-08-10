package in.org.genSpark.service;

import in.org.genSpark.dto.ContactFormDto;
import in.org.genSpark.model.Meeting;

//=======================================================================================
// EMAIL SERVICE - A placeholder to simulate sending emails.
//=======================================================================================

public interface EmailService {
	void sendPasswordResetEmail(String toEmail, String token);

	void sendOtpEmail(String toEmail, String otp);

	void sendMeetingReminderEmail(String toEmail, Meeting meeting);

	void sendContactFormEmail(ContactFormDto contactFormDto);
}