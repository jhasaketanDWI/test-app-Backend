package in.org.genSpark.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.org.genSpark.dto.ApiResponse;
import in.org.genSpark.dto.ChangePasswordDto;
import in.org.genSpark.dto.ProfileUpdateDto;
import in.org.genSpark.dto.UserResponseDto;
import in.org.genSpark.dto.VerificationRequestDto;
import in.org.genSpark.service.UserService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/users") // Base path is protected
public class UserController {

	@Autowired
	private UserService userService;

	/**
	 * Endpoint for a logged-in user to get their own profile. URL: GET
	 * /api/users/me
	 */
	@GetMapping("/me")
	public ResponseEntity<UserResponseDto> getCurrentUserProfile(Principal principal) {
		// The 'principal.getName()' will securely provide the email of the logged-in
		// user from the JWT.
		UserResponseDto userProfile = userService.getUserProfileByEmail(principal.getName());
		return ResponseEntity.ok(userProfile);
	}

	@PreAuthorize("hasAnyRole('INVESTOR', 'ADMIN')")
	@GetMapping("/startup-ideas")
	public ResponseEntity<List<UserResponseDto>> getStartUpProfiles() {
		return ResponseEntity.ok(this.userService.getAllEnrepreneurs());
	}

	@PreAuthorize("hasAnyRole('STARTUP', 'ADMIN')")
	@GetMapping("/investors")
	public ResponseEntity<List<UserResponseDto>> getInvestorProfiles() {
		return ResponseEntity.ok(this.userService.getAllInvestors());
	}

	/**
	 * Endpoint for a logged-in user to update their own profile. URL: PUT
	 * /api/users/me
	 */
	@PutMapping("/me")
	public ResponseEntity<ApiResponse<?>> updateCurrentUserProfile(
			@Valid @RequestBody ProfileUpdateDto profileUpdateDto, Principal principal) {
		ApiResponse<?> response = userService.updateUserProfile(principal.getName(), profileUpdateDto);
		return ResponseEntity.ok(response);
	}

	/**
	 * Endpoint for an investor to submit their verification documents. This method
	 * is protected and only accessible by users with the INVESTOR role. URL: POST
	 * /api/users/me/submit-verification
	 */
	@PostMapping("/me/submit-verification")
	@PreAuthorize("hasRole('INVESTOR')")
	public ResponseEntity<ApiResponse<?>> submitVerification(@Valid @RequestBody VerificationRequestDto verificationDto,
			Principal principal) {
		ApiResponse<?> response = userService.submitForVerification(principal.getName(), verificationDto);
		return ResponseEntity.ok(response);
	}

	// --- NEW ENDPOINT ---

	/**
	 * Endpoint for a logged-in user to change their own password. URL: POST
	 * /genspark/api/v1/users/me/change-password
	 */
	@PostMapping("/me/change-password")
	public ResponseEntity<ApiResponse<?>> changePassword(@Valid @RequestBody ChangePasswordDto changePasswordDto,
			Principal principal) {
		ApiResponse<?> response = userService.changePassword(principal.getName(), changePasswordDto);
		if (!response.getMessage().isBlank() && response.isStatus()) {
			return ResponseEntity.ok(response);
		} else {
			// Return a 400 Bad Request if the old password was incorrect.
			return ResponseEntity.badRequest().body(response);
		}
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/all")
	public ResponseEntity<List<UserResponseDto>> getAllUsers() {
		return ResponseEntity.ok(userService.getAllUsers());
	}

}
