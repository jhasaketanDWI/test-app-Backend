package in.org.genSpark.dto;

//=======================================================================================
//1. NEW DTOS - For handling the forgot/reset password requests.
//=======================================================================================

//File: src/main/java/in/genspark/genspark_backend/dto/auth/ForgotPasswordDto.java

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ForgotPasswordDto {
	@NotBlank(message = "Email cannot be empty")
	@Email(message = "Please provide a valid email address")
	private String email;
}