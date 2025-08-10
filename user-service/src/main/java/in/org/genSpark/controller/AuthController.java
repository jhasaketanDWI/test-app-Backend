package in.org.genSpark.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.org.genSpark.dto.ApiResponse;
import in.org.genSpark.dto.ForgotPasswordDto;
import in.org.genSpark.dto.JwtResponse;
import in.org.genSpark.dto.LoginRequestDto;
import in.org.genSpark.dto.OtpVerificationDto;
import in.org.genSpark.dto.PreRegisterCheckDto;
import in.org.genSpark.dto.RegisterUserDto;
import in.org.genSpark.dto.ResetPasswordDto;
import in.org.genSpark.dto.ValidateOtpDto;
import in.org.genSpark.service.AuthService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth") // Base path is now /api/auth, which is public
public class AuthController {

	@Autowired
	private AuthService authService;

	/**
	 * STEP 1: Check email and send OTP. URL: POST /genspark/api/v1/auth/send-otp
	 */
	@PostMapping("/send-otp")
	public ResponseEntity<ApiResponse<?>> sendRegistrationOtp(
			@Valid @RequestBody PreRegisterCheckDto preRegisterCheckDto) {
		ApiResponse<?> response = authService.checkAndSendOtp(preRegisterCheckDto);
		if (response.isStatus()) {
			return ResponseEntity.ok(response);
		} else {
			return ResponseEntity.badRequest().body(response);
		}
	}

	/**
	 * STEP 2: Validate the received OTP. URL: POST
	 * /genspark/api/v1/auth/validate-otp
	 */
	@PostMapping("/validate-otp")
	public ResponseEntity<ApiResponse<?>> validateOtp(@Valid @RequestBody ValidateOtpDto validateOtpDto) {
		ApiResponse<?> response = authService.validateRegistrationOtp(validateOtpDto);
		if (response.isStatus()) {
			return ResponseEntity.ok(response);
		} else {
			return ResponseEntity.badRequest().body(response);
		}
	}

	/**
	 * STEP 3: Finalize registration after successful OTP validation. URL: POST
	 * /genspark/api/v1/auth/register
	 */
	@PostMapping("/register")
	public ResponseEntity<ApiResponse<?>> registerUser(@Valid @RequestBody RegisterUserDto registerUserDto) {
		// The service layer will re-check the OTP's validity before creating the user.
		ApiResponse<?> response = authService.registerUser(registerUserDto);
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	/**
	 * Endpoint for user login. URL: POST /api/auth/login
	 */
	@PostMapping("/login")
	public ResponseEntity<JwtResponse> loginUser(@Valid @RequestBody LoginRequestDto loginRequestDto) {
		JwtResponse response = authService.loginUser(loginRequestDto);
		return ResponseEntity.ok(response);
	}

	/**
	 * Endpoint to request a password reset link. URL: POST
	 * /genspark/api/v1/auth/forgot-password
	 */
	@PostMapping("/forgot-password")
	public ResponseEntity<ApiResponse<?>> forgotPassword(@Valid @RequestBody ForgotPasswordDto forgotPasswordDto) {
		ApiResponse<?> response = authService.forgotPassword(forgotPasswordDto);
		return ResponseEntity.ok(response);
	}

	/**
	 * Endpoint to finalize the password reset using the token. URL: POST
	 * /genspark/api/v1/auth/reset-password
	 */
	@PostMapping("/reset-password")
	public ResponseEntity<ApiResponse<?>> resetPassword(@Valid @RequestBody ResetPasswordDto resetPasswordDto) {
		ApiResponse<?> response = authService.resetPassword(resetPasswordDto);
		if (!response.getMessage().isBlank() && response.isStatus()) {
			return ResponseEntity.ok(response);
		} else {
			// Return a 400 Bad Request if the token is invalid or expired.
			return ResponseEntity.badRequest().body(response);
		}
	}
	// --- NEW ENDPOINT ---

	/**
	 * Endpoint to verify a user's email with an OTP. URL: POST
	 * /genspark/api/v1/auth/verify-email
	 */
	@PostMapping("/verify-email")
	public ResponseEntity<ApiResponse<?>> verifyEmail(@Valid @RequestBody OtpVerificationDto otpVerificationDto) {
		ApiResponse<?> response = authService.verifyEmail(otpVerificationDto);
		if (response.isStatus()) {
			return ResponseEntity.ok(response);
		} else {
			return ResponseEntity.badRequest().body(response);
		}
	}

	@PostMapping("/register-admin")
	public ResponseEntity<?> registerAdmin(@RequestBody RegisterUserDto registerRequest) {
		// This is the correct way to structure a try-catch block in a controller method
		try {
			ApiResponse<?> response = authService.registerAdmin(registerRequest);
			if (response.isStatus()) {
				return ResponseEntity.ok(response);
			} else {
				return ResponseEntity.badRequest().body(response);
			}
		} catch (RuntimeException e) {
			return ResponseEntity.status(500).body(new ApiResponse<>(null, e.getMessage(), false));
		}
	}
}