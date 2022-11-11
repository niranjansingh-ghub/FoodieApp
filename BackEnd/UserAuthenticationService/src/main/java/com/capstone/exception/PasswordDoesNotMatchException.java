package com.capstone.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Password doesn't Match")
public class PasswordDoesNotMatchException extends Exception{
}