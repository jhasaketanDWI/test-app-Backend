package in.org.genSpark.dto;

import lombok.Data;

@Data
public class ContactFormDto {
	private String name;
	private String email;
	private String mobile;
	private String subject;
	private String message;
}