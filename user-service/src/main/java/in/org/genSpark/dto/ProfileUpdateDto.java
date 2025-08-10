package in.org.genSpark.dto;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProfileUpdateDto {
    @Size(min = 3, message = "Name must be at least 3 characters long")
    private String name;

	@Pattern(regexp = "^\\d{10}$", message = "Phone number must be exactly 10 digits")
	private String phone;

    @Size(max = 500, message = "Bio cannot exceed 500 characters")
    private String bio;
    
    private String location;
    
    // The profile picture URL will be handled separately via a file upload endpoint
}
