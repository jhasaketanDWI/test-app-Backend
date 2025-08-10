package in.org.genSpark.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import in.org.genSpark.security.CloudinaryService;

@RestController
@RequestMapping("/cloudinary/media")
public class FileUploadController {

	private final CloudinaryService cloudinaryService;

	public FileUploadController(CloudinaryService cloudinaryService) {
		this.cloudinaryService = cloudinaryService;
	}

	@SuppressWarnings("rawtypes")
	@PostMapping("/upload-image")
	public ResponseEntity<Map> uploadImage(@RequestParam("image") MultipartFile file) {
		try {
			Map uploadResult = cloudinaryService.upload(file);
			return new ResponseEntity<>(uploadResult, HttpStatus.OK);
		} catch (IOException e) {
			e.printStackTrace();
			return new ResponseEntity<>(Map.of("message", "File upload failed!"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@SuppressWarnings("rawtypes")
	@PostMapping("/upload-video")
	public ResponseEntity<Map> uploadVideo(@RequestParam("video") MultipartFile file) {
		try {
			Map uploadResult = cloudinaryService.uploadVideo(file);
			return new ResponseEntity<>(uploadResult, HttpStatus.OK);
		} catch (IOException e) {
			e.printStackTrace();
			return new ResponseEntity<>(Map.of("message", "File upload failed!"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}