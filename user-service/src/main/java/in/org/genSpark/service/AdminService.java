package in.org.genSpark.service;

import java.util.List;

import in.org.genSpark.dto.ApiResponse;
import in.org.genSpark.dto.UserResponseDto;

public interface AdminService {
	List<UserResponseDto> getAllUsers();

	ApiResponse<?> verifyInvestor(Long investorId, boolean isApproved);

	ApiResponse<?> deleteUser(Long userId);

	ApiResponse<?> deletePitch(Long pitchId);
}
