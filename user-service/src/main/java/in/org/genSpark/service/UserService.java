package in.org.genSpark.service;

import java.util.List;

import in.org.genSpark.dto.ApiResponse;
import in.org.genSpark.dto.ChangePasswordDto;
import in.org.genSpark.dto.ProfileUpdateDto;
import in.org.genSpark.dto.UserResponseDto;
import in.org.genSpark.dto.VerificationRequestDto;

public interface UserService {
	UserResponseDto getUserProfileByEmail(String email);

	ApiResponse<?> updateUserProfile(String email, ProfileUpdateDto profileUpdateDto);

	ApiResponse<?> submitForVerification(String email, VerificationRequestDto verificationRequestDto);

	List<UserResponseDto> getAllInvestors();

	List<UserResponseDto> getAllEnrepreneurs();

	List<UserResponseDto> getAllUsers();

	UserResponseDto getUserProfileById(Long id);

	ApiResponse<?> changePassword(String userEmail, ChangePasswordDto changePasswordDto);

}