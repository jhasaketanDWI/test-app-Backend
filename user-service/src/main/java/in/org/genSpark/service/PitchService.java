package in.org.genSpark.service;

import java.util.List;

import in.org.genSpark.dto.ApiResponse;
import in.org.genSpark.dto.PitchRequestDto;
import in.org.genSpark.dto.PitchResponseDto;

public interface PitchService {
	PitchResponseDto createPitch(String entrepreneurEmail, PitchRequestDto pitchRequestDto);

	List<PitchResponseDto> getAllPitchesForInvestor();

	PitchResponseDto getPitchById(Long pitchId);

	ApiResponse<?> likePitch(Long pitchId, String investorEmail);

	ApiResponse<?> addToWatchlist(Long pitchId, String investorEmail);
}
