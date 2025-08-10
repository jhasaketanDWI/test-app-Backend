package in.org.genSpark.service;

import in.org.genSpark.dto.ApiResponse;
import in.org.genSpark.dto.ForgotPasswordDto;
import in.org.genSpark.dto.JwtResponse;
import in.org.genSpark.dto.LoginRequestDto;
import in.org.genSpark.dto.OtpVerificationDto;
import in.org.genSpark.dto.PreRegisterCheckDto;
import in.org.genSpark.dto.RegisterUserDto;
import in.org.genSpark.dto.ResetPasswordDto;
import in.org.genSpark.dto.ValidateOtpDto;

public interface AuthService {

	JwtResponse loginUser(LoginRequestDto loginRequestDto);

	ApiResponse<?> forgotPassword(ForgotPasswordDto forgotPasswordDto);

	ApiResponse<?> resetPassword(ResetPasswordDto resetPasswordDto);

	ApiResponse<?> verifyEmail(OtpVerificationDto otpVerificationDto);

	ApiResponse<?> checkAndSendOtp(PreRegisterCheckDto preRegisterCheckDto);

	ApiResponse<?> validateRegistrationOtp(ValidateOtpDto validateOtpDto);

	ApiResponse<?> registerUser(RegisterUserDto registerUserDto);

	ApiResponse<?> registerAdmin(RegisterUserDto registerRequest);

}