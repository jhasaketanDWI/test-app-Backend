package in.org.genSpark.model;

import java.time.LocalDateTime;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import in.org.genSpark.enums.PitchStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "pitches")
@Getter
@Setter
public class Pitch {
	// --- Core Pitch Fields ---
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "entrepreneur_id", nullable = false)
	private User entrepreneur;

	@Column(nullable = false)
	private String businessName;

	@Column(nullable = false)
	private String industry;

	@Column(nullable = false)
	private Double fundingAmountSought;

	@Column(length = 500)
	private String shortDescription;

	@Column(nullable = false)
	private String videoUrl;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private PitchStatus status = PitchStatus.ACTIVELY_SEEKING;

	@CreationTimestamp
	@Column(name = "created_at", updatable = false)
	private LocalDateTime createdAt;

	@UpdateTimestamp
	@Column(name = "updated_at")
	private LocalDateTime updatedAt;

	// --- FOCUSED ML PARAMETERS (SELF-ASSESSMENT) ---
	// These 5 fields provide the most value for an initial rating model.

	/**
	 * // * Is there a clear, identifiable group of people who need this solution?
	 * //
	 */
//	private boolean hasMarketDemand;
//
//	/**
//	 * Is there a viable plan to generate revenue? (e.g., subscriptions, ads, sales)
//	 */
//	private boolean hasMonetizationStrategy;
//
//	/**
//	 * Does the proposed solution effectively solve a real and significant problem?
//	 */
//	private boolean hasProblemSolutionFit;
//
//	/**
//	 * Is there any early proof of concept? (e.g., a prototype, user surveys,
//	 * sign-ups)
//	 */
//	private boolean hasEarlyValidationOrTraction;
//
//	/**
//	 * Does the founding team have the necessary skills and experience to build
//	 * this?
//	 */
//	private boolean hasTeamCapability;

	// --- Relationships ---
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "pitch_likes", joinColumns = @JoinColumn(name = "pitch_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
	private Set<User> likedByInvestors;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "pitch_watchlists", joinColumns = @JoinColumn(name = "pitch_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
	private Set<User> watchlistedByInvestors;
}