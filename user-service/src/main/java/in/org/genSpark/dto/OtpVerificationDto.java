package in.org.genSpark.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class OtpVerificationDto {
	@NotBlank(message = "Email cannot be empty")
	private String email;

	@NotBlank(message = "OTP cannot be empty")
	@Size(min = 6, max = 6, message = "OTP must be 6 digits")
	private String otp;
}