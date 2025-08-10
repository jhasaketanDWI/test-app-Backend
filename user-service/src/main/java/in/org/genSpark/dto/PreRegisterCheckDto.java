package in.org.genSpark.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PreRegisterCheckDto {
	@NotBlank
	@Email
	private String email;
}