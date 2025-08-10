package in.org.genSpark.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class VerificationRequestDto {
	@NotBlank(message = "Document URL or profile link cannot be empty")
	private String documentUrl;
}