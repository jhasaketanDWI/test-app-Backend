package in.org.genSpark.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.org.genSpark.dto.ApiResponse;
import in.org.genSpark.dto.PitchRequestDto;
import in.org.genSpark.dto.PitchResponseDto;
import in.org.genSpark.exception.ResourceNotFoundException;
import in.org.genSpark.model.Pitch;
import in.org.genSpark.model.User;
import in.org.genSpark.repository.PitchRepository;
import in.org.genSpark.repository.UserRepository;
import in.org.genSpark.service.PitchService;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class PitchServiceImpl implements PitchService {

	@Autowired
	private PitchRepository pitchRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public PitchResponseDto createPitch(String entrepreneurEmail, PitchRequestDto pitchRequestDto) {
		User entrepreneur = userRepository.findByEmail(entrepreneurEmail)
				.orElseThrow(() -> new ResourceNotFoundException("User", "email", entrepreneurEmail));

		Pitch pitch = modelMapper.map(pitchRequestDto, Pitch.class);
		pitch.setEntrepreneur(entrepreneur);
		// In a real app, the videoUrl would come from a file upload service (e.g., S3)
		pitch.setVideoUrl("http://example.com/placeholder.mp4");

		Pitch savedPitch = pitchRepository.save(pitch);
		return modelMapper.map(savedPitch, PitchResponseDto.class);
	}

	@Override
	public List<PitchResponseDto> getAllPitchesForInvestor() {
		return pitchRepository.findAll().stream().map(pitch -> {
			PitchResponseDto dto = modelMapper.map(pitch, PitchResponseDto.class);
			dto.setLikeCount(pitch.getLikedByInvestors().size());
			return dto;
		}).collect(Collectors.toList());
	}

	@Override
	public PitchResponseDto getPitchById(Long pitchId) {
		Pitch pitch = pitchRepository.findById(pitchId)
				.orElseThrow(() -> new ResourceNotFoundException("Pitch", "id", pitchId));
		PitchResponseDto dto = modelMapper.map(pitch, PitchResponseDto.class);
		dto.setLikeCount(pitch.getLikedByInvestors().size());
		return dto;
	}

	@Override
	public ApiResponse<?> likePitch(Long pitchId, String investorEmail) {
		Pitch pitch = pitchRepository.findById(pitchId)
				.orElseThrow(() -> new ResourceNotFoundException("Pitch", "id", pitchId));
		User investor = userRepository.findByEmail(investorEmail)
				.orElseThrow(() -> new ResourceNotFoundException("User", "email", investorEmail));

		pitch.getLikedByInvestors().add(investor);
		return new ApiResponse<>("Pitch liked successfully.", true);
	}

	@Override
	public ApiResponse<?> addToWatchlist(Long pitchId, String investorEmail) {
		Pitch pitch = pitchRepository.findById(pitchId)
				.orElseThrow(() -> new ResourceNotFoundException("Pitch", "id", pitchId));
		User investor = userRepository.findByEmail(investorEmail)
				.orElseThrow(() -> new ResourceNotFoundException("User", "email", investorEmail));

		pitch.getWatchlistedByInvestors().add(investor);
		return new ApiResponse<>("Pitch added to watchlist.", true);
	}
}

