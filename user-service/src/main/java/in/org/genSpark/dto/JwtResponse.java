package in.org.genSpark.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {
	private String token;
	private String role;
	private String username; // User's email

}