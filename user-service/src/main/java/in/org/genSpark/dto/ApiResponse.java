package in.org.genSpark.dto;

import java.time.LocalDateTime;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ApiResponse<T> {
	private String message;
	private String name;
	private LocalDateTime dateTime;
	private boolean status;

	/**
	 * @param message
	 * @param dateTime
	 * @param status
	 */
	public ApiResponse(String message, boolean status) {
		super();
		this.message = message;
		this.dateTime = LocalDateTime.now();
		this.status = status;
	}

	public ApiResponse(String userName, String message, boolean status) {
		super();
		this.name = userName;
		this.message = message;
		this.dateTime = LocalDateTime.now();
		this.status = status;
	}

}

