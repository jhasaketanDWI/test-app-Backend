package in.org.genSpark.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.org.genSpark.dto.ContactFormDto;
import in.org.genSpark.service.EmailService;

@RestController
@RequestMapping("/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

	@Autowired
	private EmailService emailService;

	@PostMapping
	public ResponseEntity<String> handleContactForm(@RequestBody ContactFormDto contactFormDto) {
		try {
			emailService.sendContactFormEmail(contactFormDto);
			return ResponseEntity.ok("Message sent successfully!");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("An error occurred while sending the message.");
		}
	}
}