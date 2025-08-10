package in.org.genSpark.service;

import java.util.List;

import in.org.genSpark.dto.ApiResponse;
import in.org.genSpark.dto.NotificationDto;
import in.org.genSpark.model.User;

public interface NotificationService {
	void createNotification(User recipient, String message, String link);

	List<NotificationDto> getNotificationsForUser(String userEmail);

	ApiResponse<?> markNotificationAsRead(Long notificationId, String userEmail);
}
