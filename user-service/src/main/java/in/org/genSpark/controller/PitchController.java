
//=======================================================================================
//3. PITCH CONTROLLER - For all actions related to pitches.
//=======================================================================================

package in.org.genSpark.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.org.genSpark.dto.ApiResponse;
import in.org.genSpark.dto.PitchRequestDto;
import in.org.genSpark.dto.PitchResponseDto;
import in.org.genSpark.service.PitchService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/pitches") // Base URL: /genspark/api/v1/pitches
public class PitchController {

	private PitchService pitchService;

	@Autowired
	public PitchController(PitchService pitchService) {

		this.pitchService = pitchService;
	}

	/**
	 * Endpoint for an STARTUP to create a new pitch. Accessible only by users with
	 * the STARTUP role.
	 */
	@PostMapping
	@PreAuthorize("hasRole('STARTUP')")
	public ResponseEntity<PitchResponseDto> createPitch(@Valid @RequestBody PitchRequestDto pitchRequestDto,
			Principal principal) {
		PitchResponseDto createdPitch = pitchService.createPitch(principal.getName(), pitchRequestDto);
		return new ResponseEntity<>(createdPitch, HttpStatus.CREATED);
	}

	/**
	 * Endpoint for a verified investor to view all available pitches. Accessible
	 * only by users with the INVESTOR role.
	 */
	@GetMapping
	@PreAuthorize("hasRole('INVESTOR')")
	public ResponseEntity<List<PitchResponseDto>> getAllPitches() {
		// Note: The service layer should add logic to ensure the investor is verified.
		List<PitchResponseDto> pitches = pitchService.getAllPitchesForInvestor();
		return ResponseEntity.ok(pitches);
	}

	/**
	 * Endpoint for a verified investor to view a single pitch by its ID. Accessible
	 * only by users with the INVESTOR role.
	 */
	@GetMapping("/{pitchId}")
	@PreAuthorize("hasRole('INVESTOR')")
	public ResponseEntity<PitchResponseDto> getPitchById(@PathVariable Long pitchId) {
		PitchResponseDto pitch = pitchService.getPitchById(pitchId);
		return ResponseEntity.ok(pitch);
	}

	/**
	 * Endpoint for an investor to "like" a pitch. Accessible only by users with the
	 * INVESTOR role.
	 */
	@PostMapping("/{pitchId}/like")
	@PreAuthorize("hasRole('INVESTOR')")
	public ResponseEntity<ApiResponse<?>> likePitch(@PathVariable Long pitchId, Principal principal) {
		ApiResponse<?> response = pitchService.likePitch(pitchId, principal.getName());
		return ResponseEntity.ok(response);
	}

	/**
	 * Endpoint for an investor to add a pitch to their watchlist. Accessible only
	 * by users with the INVESTOR role.
	 */
	@PostMapping("/{pitchId}/watchlist")
	@PreAuthorize("hasRole('INVESTOR')")
	public ResponseEntity<ApiResponse<?>> addToWatchlist(@PathVariable Long pitchId, Principal principal) {
		ApiResponse<?> response = pitchService.addToWatchlist(pitchId, principal.getName());
		return ResponseEntity.ok(response);
	}
}
