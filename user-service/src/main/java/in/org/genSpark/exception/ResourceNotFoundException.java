package in.org.genSpark.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@SuppressWarnings("serial")
@NoArgsConstructor
@Getter
@Setter

public class ResourceNotFoundException extends RuntimeException {
	private String resource;
	private String fieldName;

	private String email_value;
	private Object value;

	/**
	 * @param resource
	 * @param fieldName
	 * @param value
	 */
	public ResourceNotFoundException(String resource, String fieldName, String email_value) {
		super(String.format("%s not found with %s : %s", resource, fieldName, email_value));
		this.resource = resource;
		this.fieldName = fieldName;
		this.email_value = email_value;
	}

	public ResourceNotFoundException(String resource, String fieldName, Long value) {
		super(String.format("%s not found with %s : %d", resource, fieldName, value));
		this.resource = resource;
		this.fieldName = fieldName;
		this.value = value;
	}

}
