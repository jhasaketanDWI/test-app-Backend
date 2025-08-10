package in.org.genSpark.dto;

import in.org.genSpark.enums.Role;
import in.org.genSpark.enums.VerificationStatus;
import lombok.Data;

//This is the SAFE representation of a user to send back to the client.
@Data
public class UserResponseDto {
	private Long id;
	private String name;
	private String phone;
	private String email;
	private String bio;
	private String profilePictureUrl;
	private String location;
	private Role role;
	private VerificationStatus verificationStatus;
}