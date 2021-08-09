package com.egov.namul.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class SHAUtil {
	public static String SHA512Encrypt(String str){
		try {
			MessageDigest md = MessageDigest.getInstance("SHA-512");
		    md.update(str.getBytes());
		    byte byteData[] = md.digest();

		    //convert the byte to hex format method 1
		    StringBuffer hashCodeBuffer = new StringBuffer();
		    for (int i = 0; i < byteData.length; i++) {
		        hashCodeBuffer.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
		    }
		    return hashCodeBuffer.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
	}
}
