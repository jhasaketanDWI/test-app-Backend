package in.org.genSpark.security;

import java.io.IOException;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {
	Map upload(MultipartFile file) throws IOException;

	Map uploadVideo(MultipartFile file) throws IOException;
}
