package sonique.bango.util;

import org.springframework.security.authentication.encoding.Md5PasswordEncoder;

public class EncodePassword {

    private static Md5PasswordEncoder passwordEncoder = new Md5PasswordEncoder();

    public static String encodePassword(String username, String plainTextPassword) {
        if (username == null || plainTextPassword == null) {
            throw new IllegalArgumentException("Username and password must be supplied");
        }
        return passwordEncoder.encodePassword(plainTextPassword, username.toUpperCase());
    }

    public static void main(String[] args) {
        System.out.println("md5ified = " + encodePassword("SUPPORT.USER", "testsystem"));
    }
}