package in.org.genSpark.service.impl;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import in.org.genSpark.dto.ApiResponse;
import in.org.genSpark.dto.ForgotPasswordDto;
import in.org.genSpark.dto.JwtResponse;
import in.org.genSpark.dto.LoginRequestDto;
import in.org.genSpark.dto.OtpVerificationDto;
import in.org.genSpark.dto.PreRegisterCheckDto;
import in.org.genSpark.dto.RegisterUserDto;
import in.org.genSpark.dto.ResetPasswordDto;
import in.org.genSpark.dto.ValidateOtpDto;
import in.org.genSpark.enums.Role;
import in.org.genSpark.enums.VerificationStatus;
import in.org.genSpark.model.EmailVerificationToken;
import in.org.genSpark.model.PasswordResetToken;
import in.org.genSpark.model.RegistrationOtp;
import in.org.genSpark.model.User;
import in.org.genSpark.repository.EmailVerificationTokenRepository;
import in.org.genSpark.repository.PasswordResetTokenRepository;
import in.org.genSpark.repository.RegistrationOtpRepository;
import in.org.genSpark.repository.UserRepository;
import in.org.genSpark.security.JwtHelper;
import in.org.genSpark.service.AuthService;
import in.org.genSpark.service.EmailService;

@Service
public class AuthServiceImpl implements AuthService {

	private UserRepository userRepository;

	private PasswordEncoder passwordEncoder;

	private ModelMapper modelMapper;

	private AuthenticationManager authenticationManager;

	private UserDetailsService userDetailsService;

	private JwtHelper jwtHelper;

	private PasswordResetTokenRepository tokenRepository;

	private EmailService emailService;
	private EmailVerificationTokenRepository emailTokenRepository;
	private RegistrationOtpRepository registrationOtpRepository;

	@Autowired
	public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, ModelMapper modelMapper,
			AuthenticationManager authenticationManager, UserDetailsService userDetailsService, JwtHelper jwtHelper,
			PasswordResetTokenRepository tokenRepository, EmailService emailService,
			EmailVerificationTokenRepository emailTokenRepository,
			RegistrationOtpRepository registrationOtpRepository) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.modelMapper = modelMapper;
		this.authenticationManager = authenticationManager;
		this.userDetailsService = userDetailsService;
		this.jwtHelper = jwtHelper;
		this.tokenRepository = tokenRepository;
		this.emailService = emailService;
		this.emailTokenRepository = emailTokenRepository;
		this.registrationOtpRepository = registrationOtpRepository;
	}

	@Override
	public ApiResponse<?> checkAndSendOtp(PreRegisterCheckDto dto) {
		if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
			return new ApiResponse<>(dto.getEmail(), "Email is already registered.", false);
		}
		registrationOtpRepository.findByEmail(dto.getEmail()).ifPresent(registrationOtpRepository::delete);

		String otp = generateOtp();
		RegistrationOtp registrationOtp = new RegistrationOtp(dto.getEmail(), otp);
		registrationOtpRepository.save(registrationOtp);
		emailService.sendOtpEmail(dto.getEmail(), otp);

		return new ApiResponse<>(dto.getEmail(), "OTP sent successfully to your email.", true);
	}

	@Override
	public ApiResponse<?> validateRegistrationOtp(ValidateOtpDto dto) {
		RegistrationOtp registrationOtp = registrationOtpRepository.findByEmailAndOtp(dto.getEmail(), dto.getOtp())
				.orElse(null);

		if (registrationOtp == null || registrationOtp.getExpiryDate().isBefore(LocalDateTime.now())) {
			return new ApiResponse<>("Invalid or expired OTP.", false);
		}

		// The OTP is valid. We don't delete it yet, as it's needed for the final
		// registration step.
		return new ApiResponse<>(dto.getEmail(), "OTP is valid.", true);
	}

	@Override
	public ApiResponse<?> registerUser(RegisterUserDto dto) {
		// First, re-validate the OTP to ensure the user is authorized for this final
		// step.
		RegistrationOtp registrationOtp = registrationOtpRepository.findByEmail(dto.getEmail())
				.orElseThrow(() -> new IllegalStateException("OTP validation not completed."));

		if (registrationOtp.getExpiryDate().isBefore(LocalDateTime.now())) {
			registrationOtpRepository.delete(registrationOtp); // Clean up expired token
			return new ApiResponse<>("Your session has expired. Please request a new OTP.", false);
		}

		// Check for uniqueness again to prevent race conditions.
		if (userRepository.findByPhone(dto.getPhone()).isPresent()) {
			return new ApiResponse<>(dto.getName(), "Phone number is already registered.", false);
		}

		// All checks passed, create the user.
		User user = modelMapper.map(dto, User.class);
		user.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
		user.setVerificationStatus(VerificationStatus.VERIFIED);
		userRepository.save(user);

		// Clean up the used OTP.
		registrationOtpRepository.delete(registrationOtp);

		return new ApiResponse<>(user.getEmail(), "User registered successfully!", true);
	}

	@Override
	public JwtResponse loginUser(LoginRequestDto loginRequestDto) {
		User user = userRepository.findByEmail(loginRequestDto.getEmail())
				.orElseThrow(() -> new BadCredentialsException("Invalid credentials"));

		// PREVENT LOGIN IF EMAIL IS NOT VERIFIED
		if (user.getVerificationStatus() != VerificationStatus.VERIFIED) {
			throw new BadCredentialsException("Please verify your email before logging in.");
		}

		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(), loginRequestDto.getPassword()));
		final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequestDto.getEmail());
		final String token = jwtHelper.generateToken(userDetails);
		return new JwtResponse(token, user.getRole().toString(), userDetails.getUsername());
	}

	@Override
	public ApiResponse<?> forgotPassword(ForgotPasswordDto forgotPasswordDto) {

		userRepository.findByEmail(forgotPasswordDto.getEmail()).ifPresent(user -> {
			// Invalidate any existing token for this user to ensure only the latest one is
			// valid.
			tokenRepository.findByUser(user).ifPresent(tokenRepository::delete);

			// Generate a new, secure token.
			String token = UUID.randomUUID().toString();
			PasswordResetToken resetToken = new PasswordResetToken(token, user);
			tokenRepository.save(resetToken);

			// Send the email with the reset link.
			emailService.sendPasswordResetEmail(user.getEmail(), token);
		});

		// For security, always return a generic success message to prevent email
		// enumeration attacks.
		return new ApiResponse<>("If an account with that email exists, a password reset link has been sent.", true);
	}

	@Override
	public ApiResponse<?> resetPassword(ResetPasswordDto resetPasswordDto) {
		// 1. Find the token in the database.
		PasswordResetToken token = tokenRepository.findByToken(resetPasswordDto.getToken()).orElse(null);

		// 2. Validate the token: it must exist and not be expired.
		if (token == null || token.getExpiryDate().isBefore(LocalDateTime.now())) {
			return new ApiResponse<>("Invalid or expired password reset token.", false);
		}

		// 3. If the token is valid, get the associated user and update their password.
		User user = token.getUser();
		user.setPasswordHash(passwordEncoder.encode(resetPasswordDto.getNewPassword()));

		// 4. Invalidate the token by deleting it so it cannot be used again.
		tokenRepository.delete(token);

		return new ApiResponse<>("Password has been reset successfully.", true);
	}

	@Override
	public ApiResponse<?> verifyEmail(OtpVerificationDto dto) {
		EmailVerificationToken token = emailTokenRepository.findByOtp(dto.getOtp()).orElse(null);

		if (token == null || !token.getUser().getEmail().equals(dto.getEmail())
				|| token.getExpiryDate().isBefore(LocalDateTime.now())) {
			return new ApiResponse<>("Invalid or expired OTP.", false);
		}

		User user = token.getUser();
		user.setVerificationStatus(VerificationStatus.VERIFIED);
		User savedUser = userRepository.save(user);

		// Delete the token so it cannot be used again
		emailTokenRepository.delete(token);

		return new ApiResponse<>(savedUser.getEmail(), "Email verified successfully! You can now log in.", true);
	}

	private String generateOtp() {
		// Generate a 6-digit OTP
		return String.format("%06d", new SecureRandom().nextInt(999999));
	}

	public ApiResponse<?> registerAdmin(RegisterUserDto registerRequest) {
		// Optional: Prevent creation of more than one admin
		if (userRepository.existsByRole(Role.ADMIN)) {
			throw new RuntimeException("An admin account already exists.");
		}
		if (userRepository.existsByEmail(registerRequest.getEmail())) {
			throw new RuntimeException("Email is already in use.");
		}

		User admin = new User();
		admin.setName(registerRequest.getName());
		admin.setEmail(registerRequest.getEmail());
		admin.setPhone(registerRequest.getPhone());
		// Hash the password before saving
		admin.setPasswordHash(passwordEncoder.encode(registerRequest.getPassword()));
		admin.setRole(Role.ADMIN);
		// Admins can be pre-verified
		admin.setVerificationStatus(VerificationStatus.VERIFIED);

		userRepository.save(admin);
		return new ApiResponse<>(admin.getEmail(), "Admin registered successfully!", true);
	}

}
