
package in.org.genSpark.dto;

import in.org.genSpark.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterUserDto {
	@NotBlank
	@Size(min = 3)
	private String name;
	@NotBlank
	@Email
	private String email;
	@NotBlank
	@Pattern(regexp = "^\\d{10}$")
	private String phone;
	@NotBlank
	@Size(min = 8)
	private String password;
	@NotNull
	private Role role;

}
