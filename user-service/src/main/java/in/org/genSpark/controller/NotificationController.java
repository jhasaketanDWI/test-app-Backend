package in.org.genSpark.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.org.genSpark.dto.ApiResponse;
import in.org.genSpark.dto.NotificationDto;
import in.org.genSpark.service.NotificationService;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

	private NotificationService notificationService;

	@GetMapping
	public ResponseEntity<List<NotificationDto>> getUserNotifications(Principal principal) {
		List<NotificationDto> notifications = notificationService.getNotificationsForUser(principal.getName());
		return ResponseEntity.ok(notifications);
	}

	@PostMapping("/{notificationId}/read")
	public ResponseEntity<ApiResponse<?>> markAsRead(@PathVariable Long notificationId, Principal principal) {
		ApiResponse<?> response = notificationService.markNotificationAsRead(notificationId, principal.getName());
		return ResponseEntity.ok(response);
	}

}
