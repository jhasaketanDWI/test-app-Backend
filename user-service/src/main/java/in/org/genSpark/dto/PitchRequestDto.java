package in.org.genSpark.dto;


import in.org.genSpark.enums.PitchStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PitchRequestDto {
    // --- Core Pitch Fields ---
    @NotBlank(message = "Business name cannot be empty")
    private String businessName;

    @NotBlank(message = "Industry cannot be empty")
    private String industry;

    @NotNull(message = "Funding amount cannot be null")
    @Positive(message = "Funding amount must be positive")
    private Double fundingAmountSought;

    @NotBlank(message = "Description cannot be empty")
    @Size(max = 500, message = "Short description cannot exceed 500 characters")
    private String shortDescription;

    @NotNull(message = "Pitch status must be provided")
    private PitchStatus status;

    // --- FOCUSED ML PARAMETERS (SELF-ASSESSMENT) ---
    // These fields will be presented as simple Yes/No questions to the user.
    
    @NotNull(message = "Market Demand must be specified")
    private Boolean hasMarketDemand;

    @NotNull(message = "Monetization Strategy must be specified")
    private Boolean hasMonetizationStrategy;
    
    @NotNull(message = "Problem-Solution Fit must be specified")
    private Boolean hasProblemSolutionFit;

    @NotNull(message = "Early Validation / Traction must be specified")
    private Boolean hasEarlyValidationOrTraction;

    @NotNull(message = "Team Capability must be specified")
    private Boolean hasTeamCapability;
}
