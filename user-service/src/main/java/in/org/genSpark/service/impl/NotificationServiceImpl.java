package in.org.genSpark.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import in.org.genSpark.dto.ApiResponse;
import in.org.genSpark.dto.NotificationDto;
import in.org.genSpark.exception.ResourceNotFoundException;
import in.org.genSpark.model.Notification;
import in.org.genSpark.model.User;
import in.org.genSpark.repository.NotificationRepository;
import in.org.genSpark.repository.UserRepository;
import in.org.genSpark.service.NotificationService;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class NotificationServiceImpl implements NotificationService {

	@Autowired
	private NotificationRepository notificationRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public void createNotification(User recipient, String message, String link) {
		Notification notification = new Notification();
		notification.setRecipient(recipient);
		notification.setMessage(message);
		notification.setLink(link);
		notificationRepository.save(notification);
	}

	@Override
	public List<NotificationDto> getNotificationsForUser(String userEmail) {
		User user = userRepository.findByEmail(userEmail)
				.orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

		return notificationRepository.findByRecipientIdOrderByCreatedAtDesc(user.getId()).stream()
				.map(notification -> modelMapper.map(notification, NotificationDto.class)).collect(Collectors.toList());
	}

	@Override
	public ApiResponse<?> markNotificationAsRead(Long notificationId, String userEmail) {
		Notification notification = notificationRepository.findById(notificationId)
				.orElseThrow(() -> new ResourceNotFoundException("Notification", "id", notificationId));

		// Ensure the notification belongs to the user trying to mark it as read
		if (!notification.getRecipient().getEmail().equals(userEmail)) {
			throw new AccessDeniedException("You are not authorized to access this notification.");
		}

		notification.setRead(true);
		return new ApiResponse<>("Notification marked as read.", true);
	}

}
