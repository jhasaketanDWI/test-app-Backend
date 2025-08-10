package in.org.genSpark.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import in.org.genSpark.dto.ApiResponse;
import in.org.genSpark.dto.UserResponseDto;
import in.org.genSpark.service.AdminService;

@RestController
@RequestMapping("/admin") // Base URL: /genspark/api/v1/admin
@PreAuthorize("hasRole('ADMIN')") // Secures all methods in this controller
public class AdminController {

	@Autowired
	private AdminService adminService;

	/**
	 * Endpoint to get a list of all users on the platform.
	 */
	@GetMapping("/users")
	public ResponseEntity<List<UserResponseDto>> getAllUsers() {
		List<UserResponseDto> users = adminService.getAllUsers();
		return ResponseEntity.ok(users);
	}

	/**
	 * Endpoint to approve or reject an investor's verification request.
	 * 
	 * @param investorId The ID of the investor to review.
	 * @param approved   A boolean query parameter (true for approve, false for
	 *                   reject).
	 */
	@PostMapping("/investors/{investorId}/verify")
	public ResponseEntity<ApiResponse<?>> verifyInvestor(@PathVariable Long investorId,
			@RequestParam boolean approved) {
		ApiResponse<?> response = adminService.verifyInvestor(investorId, approved);
		return ResponseEntity.ok(response);
	}

	/**
	 * Endpoint to delete a user account.
	 */
	@DeleteMapping("/users/{userId}")
	public ResponseEntity<ApiResponse<?>> deleteUser(@PathVariable Long userId) {
		ApiResponse<?> response = adminService.deleteUser(userId);
		return ResponseEntity.ok(response);
	}

	/**
	 * Endpoint to delete a pitch.
	 */
	@DeleteMapping("/pitches/{pitchId}")
	public ResponseEntity<ApiResponse<?>> deletePitch(@PathVariable Long pitchId) {
		ApiResponse<?> response = adminService.deletePitch(pitchId);
		return ResponseEntity.ok(response);
	}
}
