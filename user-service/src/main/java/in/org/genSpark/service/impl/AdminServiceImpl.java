package in.org.genSpark.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.org.genSpark.dto.ApiResponse;
import in.org.genSpark.dto.UserResponseDto;
import in.org.genSpark.enums.VerificationStatus;
import in.org.genSpark.exception.ResourceNotFoundException;
import in.org.genSpark.model.InvestorVerification;
import in.org.genSpark.model.User;
import in.org.genSpark.repository.PitchRepository;
import in.org.genSpark.repository.UserRepository;
import in.org.genSpark.service.AdminService;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PitchRepository pitchRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<UserResponseDto> getAllUsers() {
		return userRepository.findAll().stream().map(user -> modelMapper.map(user, UserResponseDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public ApiResponse<?> verifyInvestor(Long investorId, boolean isApproved) {
		User investor = userRepository.findById(investorId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", investorId));

		InvestorVerification verification = investor.getVerificationDetails();
		if (verification == null) {
			throw new IllegalStateException("No verification request found for this user.");
		}

		if (isApproved) {
			investor.setVerificationStatus(VerificationStatus.VERIFIED);
		} else {
			investor.setVerificationStatus(VerificationStatus.REJECTED);
		}

		verification.setReviewedAt(LocalDateTime.now());
		// In a real app, you would get the admin's User object from the security
		// context
		// and set it here using verification.setAdmin(adminUser);

		return new ApiResponse<>("Investor verification status updated.", true);
	}

	@Override
	public ApiResponse<?> deleteUser(Long userId) {
		if (!userRepository.existsById(userId)) {
			throw new ResourceNotFoundException("User", "id", userId);
		}
		userRepository.deleteById(userId);
		return new ApiResponse<>("User deleted successfully.", true);
	}

	@Override
	public ApiResponse<?> deletePitch(Long pitchId) {
		if (!pitchRepository.existsById(pitchId)) {
			throw new ResourceNotFoundException("Pitch", "id", pitchId);
		}
		pitchRepository.deleteById(pitchId);
		return new ApiResponse<>("Pitch deleted successfully.", true);
	}


}
