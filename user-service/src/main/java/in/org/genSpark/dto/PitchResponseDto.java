package in.org.genSpark.dto;

import java.time.LocalDateTime;

import in.org.genSpark.enums.PitchStatus;
import lombok.Data;


@Data
public class PitchResponseDto {
	// --- Core Pitch Fields ---
	private Long id;
	private String businessName;
	private String industry;
	private Double fundingAmountSought;
	private String shortDescription;
	private String videoUrl;
	private PitchStatus status;
	private LocalDateTime createdAt;
	private UserResponseDto entrepreneur;
	private int likeCount;

	// --- NEW: ML PARAMETERS IN RESPONSE ---
	private boolean hasMarketDemand;
	private boolean hasMonetizationStrategy;
	private boolean hasProblemSolutionFit;
	private boolean hasEarlyValidationOrTraction;
	private boolean hasTeamCapability;
}
