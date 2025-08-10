package in.org.genSpark.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;


@Data
public class LoginRequestDto {
	@NotBlank(message = "Email cannot be empty")
	@Email
	private String email;

	@NotBlank(message = "Password cannot be empty")
	private String password;
}
