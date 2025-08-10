package in.org.genSpark.service.impl;

import java.time.format.DateTimeFormatter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import in.org.genSpark.dto.ContactFormDto;
import in.org.genSpark.model.Meeting;
import in.org.genSpark.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {

	private final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);

	@Autowired
	private JavaMailSender javaMailSender;

	@Value("${spring.mail.username}")
	private String fromEmail;

	@Value("${app.mail.to}")
	private String mailTo;

	@Override
	public void sendPasswordResetEmail(String toEmail, String token) {
		String resetUrl = "http://your-frontend-app.com/reset-password?token=" + token;

		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom(fromEmail);
		message.setTo(toEmail);
		message.setSubject("GenSpark - Password Reset Request");
		message.setText("To reset your password, please click the link below:\n\n" + resetUrl
				+ "\n\nIf you did not request this, please ignore this email.");

		javaMailSender.send(message);
		logger.info("Password reset email sent to {}", toEmail);
	}

	@Override
	public void sendOtpEmail(String toEmail, String otp) {
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();

		try {
			MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
			String htmlMsg = buildOtpEmailHtml(otp);

			helper.setFrom(fromEmail);
			helper.setTo(toEmail);
			helper.setSubject("Your GenSpark Authentication Code");
			helper.setText(htmlMsg, true);
			javaMailSender.send(mimeMessage);
			logger.info("HTML OTP verification email sent to {}", toEmail);

		} catch (MessagingException e) {
			logger.error("Failed to send OTP email to {}", toEmail, e);
		}
//		SimpleMailMessage message = new SimpleMailMessage();
//		message.setFrom(fromEmail);
//		message.setTo(toEmail);
//		message.setSubject("GenSpark - Verify Your Email Address");
//		message.setText("Welcome to GenSpark!\n\nYour One-Time Password (OTP) for email verification is: " + otp
//				+ "\n\nThis OTP is valid for 10 minutes.");
//
//		javaMailSender.send(message);
//		logger.info("OTP verification email sent to {}", toEmail);
	}

	@Override
	public void sendMeetingReminderEmail(String toEmail, Meeting meeting) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEEE, MMMM d, yyyy 'at' h:mm a");
		String meetingTime = meeting.getMeetingTime().format(formatter);
		String otherPartyName = meeting.getProposer().getEmail().equals(toEmail) ? meeting.getAttendee().getName()
				: meeting.getProposer().getName();

		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom(fromEmail);
		message.setTo(toEmail);
		message.setSubject("Reminder: Upcoming Meeting on GenSpark");
		message.setText("This is a reminder for your upcoming meeting with " + otherPartyName + ".\n\n"
				+ "Date & Time: " + meetingTime + "\n" + "Meeting Link: " + meeting.getMeetingLink() + "\n\n"
				+ "Thank you for using GenSpark!");

		javaMailSender.send(message);
		logger.info("Meeting reminder sent to {}", toEmail);
	}

	private String buildOtpEmailHtml(String otp) {
		return "<!DOCTYPE html>" + "<html lang='en'>" + "<head>" + "<meta charset='UTF-8'>"
				+ "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" + "<style>"
				+ "  body { margin: 0; padding: 0; font-family: 'Roboto', Arial, sans-serif; background-color: #f0f2f5; background-image: url('https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg'); background-size: cover; background-position: center; }"
				+ "  .overlay { background-color: rgba(0, 0, 0, 0.5); padding: 40px 20px; }"
				+ "  .email-container { max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 6px 20px rgba(0,0,0,0.15); overflow: hidden; }"
				+ "  .email-header { padding: 30px; text-align: center; }" + "  .email-header img { max-width: 150px; }"
				+ "  .email-body { padding: 20px 40px 40px 40px; text-align: center; color: #333333; }"
				+ "  .otp-title { font-size: 22px; font-weight: 500; margin-bottom: 15px; }"
				+ "  .otp-text { font-size: 16px; color: #666666; line-height: 1.5; margin-bottom: 25px; }"
				+ "  .otp-code { font-size: 36px; font-weight: bold; color: #1a1a1a; letter-spacing: 4px; background-color: #f1f3f4; padding: 15px 25px; border-radius: 5px; display: inline-block; margin: 10px 0 20px 0; }"
				+ "  .otp-validity { font-size: 14px; color: #777; }"
				+ "  .email-footer { background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #e0e0e0; }"
				+ "  .email-footer a { color: #007bff; text-decoration: none; }" + "</style>" + "</head>" + "<body>"
				+ "  <div class='overlay'>" + "    <div class='email-container'>" + "      <div class='email-header'>"
				+ "        <img src='https://placehold.co/400x100/007bff/FFFFFF?text=GenSpark' alt='GenSpark Logo'>"
				+ "      </div>" + "      <div class='email-body'>"
				+ "        <div class='otp-title'>Your Authentication Code</div>"
				+ "        <p class='otp-text'>Please use the following code to complete your registration. Do not share this code with anyone.</p>"
				+ "        <div class='otp-code'>" + otp + "</div>"
				+ "        <div class='otp-validity'>This code is valid for the next 10 minutes.</div>" + "      </div>"
				+ "      <div class='email-footer'>"
				+ "        <p>You're receiving this email because you are registering with GenSpark. If you're unsure why you received this, please <a href='mailto:jhasaketansa86@gmail.com'>Contact Us</a>.</p>"
				+ "      </div>" + "    </div>" + "  </div>" + "</body>" + "</html>";

	}

	/**
	 * Builds a professional HTML email body for the contact form submission.
	 * 
	 * @param dto The data from the contact form.
	 * @return A string containing the full HTML for the email body.
	 */
	private String buildContactFormHtml(ContactFormDto dto) {
		return "<!DOCTYPE html>" + "<html lang='en'>" + "<head>" + "<meta charset='UTF-8'>"
				+ "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" + "<style>"
				+ "  body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f6; }"
				+ "  .email-wrapper { padding: 20px; background-color: #f4f7f6; }"
				+ "  .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); overflow: hidden; }"
				+ "  .email-header { background-color: #4a90e2; padding: 25px; text-align: center; color: white; }"
				+ "  .email-header h1 { margin: 0; font-size: 24px; font-weight: 500; }"
				+ "  .email-body { padding: 30px 40px; color: #333333; }"
				+ "  .body-title { font-size: 20px; font-weight: 600; margin-bottom: 20px; color: #333; }"
				+ "  .info-section { margin-bottom: 20px; }"
				+ "  .info-section p { margin: 5px 0; line-height: 1.6; font-size: 16px; }"
				+ "  .info-section strong { color: #4a90e2; min-width: 80px; display: inline-block; }"
				+ "  .message-section { margin-top: 25px; padding-top: 20px; border-top: 1px solid #eeeeee; }"
				+ "  .message-section h3 { font-size: 18px; color: #333; margin-bottom: 10px; }"
				+ "  .message-content { background-color: #f8f9fa; border-left: 3px solid #4a90e2; padding: 15px; border-radius: 4px; font-style: italic; color: #555; }"
				+ "  .email-footer { background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #e0e0e0; }"
				+ "</style>" + "</head>" + "<body>" + "  <div class='email-wrapper'>"
				+ "    <div class='email-container'>" + "      <div class='email-header'>"
				+ "        <h1>New Contact Form Inquiry</h1>" + "      </div>" + "      <div class='email-body'>"
				+ "        <div class='body-title'>You've received a new message from your website.</div>"
				+ "        <div class='info-section'>" + "          <p><strong>From:</strong> " + dto.getName() + "</p>"
				+ "          <p><strong>Email:</strong> " + dto.getEmail() + "</p>"
				+ "          <p><strong>Mobile:</strong> " + dto.getMobile() + "</p>"
				+ "          <p><strong>Subject:</strong> " + dto.getSubject() + "</p>" + "        </div>"
				+ "        <div class='message-section'>" + "          <h3>Message Content:</h3>"
				+ "          <div class='message-content'>" + "            <p>" + dto.getMessage() + "</p>"
				+ "          </div>" + "        </div>" + "      </div>" + "      <div class='email-footer'>"
				+ "        <p>This email was sent from the contact form on the GenSpark website.</p>" + "      </div>"
				+ "    </div>" + "  </div>" + "</body>" + "</html>";
	}

	/**
	 * Sends the contact form submission as a formatted HTML email.
	 * 
	 * @param contactFormDto The data from the contact form.
	 */
	public void sendContactFormEmail(ContactFormDto contactFormDto) {
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		// Use MimeMessageHelper to build the email, true indicates multipart message
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

		String htmlContent = buildContactFormHtml(contactFormDto);
		String subject = "New Inquiry from GenSpark Contact Form: " + contactFormDto.getSubject();

		try {
			helper.setText(htmlContent, true);
			helper.setTo(mailTo);
			helper.setSubject(subject);
			helper.setFrom(fromEmail);
			javaMailSender.send(mimeMessage);
			logger.info("Contact Us email sent from {}", contactFormDto.getEmail());
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			logger.error("Failed to send Contact Us email to {}", mailTo, e);
		} // true indicates the text is HTML

	}

}
