package in.org.genSpark.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import in.org.genSpark.dto.ApiResponse;
import in.org.genSpark.dto.ChangePasswordDto;
import in.org.genSpark.dto.ProfileUpdateDto;
import in.org.genSpark.dto.UserResponseDto;
import in.org.genSpark.dto.VerificationRequestDto;
import in.org.genSpark.enums.Role;
import in.org.genSpark.enums.VerificationStatus;
import in.org.genSpark.exception.ResourceNotFoundException;
import in.org.genSpark.model.InvestorVerification;
import in.org.genSpark.model.User;
import in.org.genSpark.repository.InvestorVerificationRepository;
import in.org.genSpark.repository.UserRepository;
import in.org.genSpark.service.UserService;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	private UserRepository userRepository;

	private InvestorVerificationRepository verificationRepository;

	private ModelMapper modelMapper;
	private PasswordEncoder passwordEncoder; // Autowire PasswordEncoder

	@Autowired
	public UserServiceImpl(UserRepository userRepository, InvestorVerificationRepository verificationRepository,
			ModelMapper modelMapper, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.verificationRepository = verificationRepository;
		this.modelMapper = modelMapper;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public UserResponseDto getUserProfileByEmail(String email) {
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
		return modelMapper.map(user, UserResponseDto.class);
	}

	@Override
	public UserResponseDto getUserProfileById(Long id) {
		User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
		return modelMapper.map(user, UserResponseDto.class);
	}

	@Override
	public ApiResponse<?> updateUserProfile(String email, ProfileUpdateDto profileUpdateDto) {
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

		user.setName(profileUpdateDto.getName());
		user.setBio(profileUpdateDto.getBio());
		user.setLocation(profileUpdateDto.getLocation());
		// UPDATED: Added logic to update the phone number
		if (profileUpdateDto.getPhone() != null) {
			// Optional: Check if the new phone number is already taken by another user
			userRepository.findByPhone(profileUpdateDto.getPhone()).ifPresent(existingUser -> {
				if (!existingUser.getId().equals(user.getId())) {
					throw new IllegalStateException("Phone number is already in use.");
				}
			});
			user.setPhone(profileUpdateDto.getPhone());
		}

		userRepository.save(user);
		return new ApiResponse<>("Profile updated successfully", true);
	}

	@Override
	public ApiResponse<?> submitForVerification(String email, VerificationRequestDto verificationRequestDto) {
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

		if (user.getRole() != Role.INVESTOR) {
			throw new IllegalStateException("Only users with the INVESTOR role can submit for verification.");
		}
		if (user.getVerificationStatus() == VerificationStatus.VERIFIED
				|| user.getVerificationStatus() == VerificationStatus.PENDING) {
			throw new IllegalStateException("Verification is already pending or completed.");
		}

		InvestorVerification verification = new InvestorVerification();
		verification.setUser(user);
		verification.setDocumentUrl(verificationRequestDto.getDocumentUrl());
		verificationRepository.save(verification);

		user.setVerificationStatus(VerificationStatus.PENDING);
		userRepository.save(user);

		return new ApiResponse<>("Verification submitted successfully. An admin will review it shortly.", true);
	}

	@Override
	public ApiResponse<?> changePassword(String userEmail, ChangePasswordDto changePasswordDto) {
		User user = userRepository.findByEmail(userEmail)
				.orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

		// 1. Verify the user's current (old) password.
		if (!passwordEncoder.matches(changePasswordDto.getOldPassword(), user.getPasswordHash())) {
			return new ApiResponse<>("Incorrect old password.", false);
		}

		// 2. Hash and set the new password.
		user.setPasswordHash(passwordEncoder.encode(changePasswordDto.getNewPassword()));

		// @Transactional will automatically save the change.
		return new ApiResponse<>("Password changed successfully.", true);
	}

	@Override
	public List<UserResponseDto> getAllInvestors() {

		return this.userRepository.findAll().stream().filter(user -> user.getRole() == Role.INVESTOR)
				.map(user -> modelMapper.map(user, UserResponseDto.class)).toList();
	}

	@Override
	public List<UserResponseDto> getAllEnrepreneurs() {
		return this.userRepository.findAll().stream().filter(user -> user.getRole() == Role.STARTUP)

				.map(user -> modelMapper.map(user, UserResponseDto.class)).toList();
	}

	@Override
	public List<UserResponseDto> getAllUsers() {
		return this.userRepository.findAll().stream().map(user -> modelMapper.map(user, UserResponseDto.class))
				.toList();
	}
}

//@Service
//@Transactional
//public class UserServiceImpl implements UserService {
//	private UserRepository repository;
//	private ModelMapper mapper;
//	private BCryptPasswordEncoder bCryptPasswordEncoder;
//
//	@Autowired
//	public UserServiceImpl(UserRepository respository, ModelMapper mapper,
//			BCryptPasswordEncoder bCryptPasswordEncoder) {
//		this.repository = respository;
//		this.mapper = mapper;
//		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
//	}
//
//	@Override
//	public UserResponseDto getUserById(Long id) {
//		User user = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
//		return mapper.map(user, UserResponseDto.class);
//	}
//
//	@Override
//	public UserResponseDto getUserByEmail(String email) {
//		User user = repository.findByEmail(email)
//				.orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
//		return mapper.map(user, UserResponseDto.class);
//	}
//
//	@Override
//	public List<UserResponseDto> getAllUsers() {
//		return repository.findAll().stream().map(user -> mapper.map(user, UserResponseDto.class))
//				.collect(Collectors.toList());
//	}
//
//	@Override
//	public ApiResponse<?> userLogin(String email, String password) {
//		return repository.findByEmail(email).map(user -> {
//			if (bCryptPasswordEncoder.matches(password, user.getPasswordHash())) {
//				return new ApiResponse<>(user.getName(), "Login successful", true);
//			} else {
//				return new ApiResponse<>("Invalid email or password", false);
//			}
//		}).orElse(new ApiResponse<>("Invalid email or password", false));
//	}
//
//	@Override
//	public ApiResponse<?> userRegister(RegisterUserDto registerUserDto) {
//		if (registerUserDto.getRole() == Role.ADMIN) {
//			throw new IllegalArgumentException("Cannot register as an ADMIN.");
//		}
//		repository.findByEmail(registerUserDto.getEmail()).ifPresent(u -> {
//			throw new IllegalStateException("Email already exists.");
//		});
//		repository.findByPhone(registerUserDto.getPhone()).ifPresent(u -> {
//			throw new IllegalStateException("Phone number already exists.");
//		});
//
//		User user = mapper.map(registerUserDto, User.class);
//		user.setPasswordHash(bCryptPasswordEncoder.encode(registerUserDto.getPassword()));
//		user.setVerificationStatus(VerificationStatus.NOT_VERIFIED);
//
//		repository.save(user);
//		return new ApiResponse<>(user.getName(), "User registered successfully", true);
//	}
//
//	@Override
//	public ApiResponse<?> updateUser(String email, RegisterUserDto userDto) {
//
//		User userToUpdate = repository.findByEmail(email)
//				.orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
//
//		userToUpdate.setName(userDto.getName());
//		userToUpdate.setPhone(userDto.getPhone());
//
//		// @Transactional handles the save automatically.
//		return new ApiResponse<>(userToUpdate.getName(), "User data updated successfully", true);
//	}
//
//	@Override
//	public ApiResponse<?> updatePassword(Object identifier, String newPassword) {
//
//		if (newPassword == null || newPassword.length() < 8) {
//			return new ApiResponse<>("Password must be at least 8 characters long", false);
//		}
//
//		Optional<User> userOptional = findUserByIdentifier(identifier);
//
//		return userOptional.map(user -> {
//			user.setPasswordHash(bCryptPasswordEncoder.encode(newPassword));
//			return new ApiResponse<>("Password updated successfully for " + user.getName(), true);
//		}).orElse(new ApiResponse<>("User not found with identifier: " + identifier, false));
//	}
//
//	private Optional<User> findUserByIdentifier(Object identifier) {
//		if (identifier instanceof Long) {
//			return repository.findById((Long) identifier);
//		} else if (identifier instanceof String) {
//			return repository.findByEmail((String) identifier);
//		}
//		return Optional.empty();
//	}
//}
