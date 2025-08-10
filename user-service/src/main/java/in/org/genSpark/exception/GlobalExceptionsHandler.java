package in.org.genSpark.exception;



import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import in.org.genSpark.dto.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionsHandler {
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiResponse> resourceNotFoundExceptionHandler(ResourceNotFoundException ex) {
		ApiResponse response = new ApiResponse(ex.getMessage(), false);
		return new ResponseEntity<ApiResponse>(response, HttpStatus.NOT_FOUND);

	}

	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<ApiResponse> illegalArgumentExceptionHandler(IllegalArgumentException ex) {

		ApiResponse response = new ApiResponse(ex.getMessage(), false);
		return new ResponseEntity<ApiResponse>(response, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, String>> argumentNotValidExceptionHandler(MethodArgumentNotValidException ex) {
		Map<String, String> response = new HashMap<String, String>();
		ex.getBindingResult().getAllErrors().forEach(error -> {
			String errorFieldName = ((FieldError) error).getField();
			String message = error.getDefaultMessage();
			response.put(errorFieldName, message);
		});
		return new ResponseEntity<Map<String, String>>(response, HttpStatus.BAD_REQUEST);

	}

	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<ApiResponse> dataBaseErrorsHandlers(DataIntegrityViolationException ex) {
		ApiResponse response = new ApiResponse(ex.getMessage(), false);
		return new ResponseEntity<ApiResponse>(response, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiResponse> genericExceptionHandler(Exception ex) {
		ApiResponse response = new ApiResponse("An unexpected error occurred. Please try again later. ", false);
		return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);

	}
}
