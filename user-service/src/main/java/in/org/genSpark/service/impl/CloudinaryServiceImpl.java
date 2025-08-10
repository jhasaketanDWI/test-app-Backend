package in.org.genSpark.service.impl;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import in.org.genSpark.security.CloudinaryService;

@Service
public class CloudinaryServiceImpl implements CloudinaryService {

	private final Cloudinary cloudinary;

	@Autowired
	public CloudinaryServiceImpl(Cloudinary cloudinary) {
		this.cloudinary = cloudinary;
	}

	@SuppressWarnings("unchecked")
	public Map upload(MultipartFile file) throws IOException {
		return cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
	}

	@SuppressWarnings("unchecked")
	public Map uploadVideo(MultipartFile file) throws IOException {
		return cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("resource_type", "video"));
	}
}
