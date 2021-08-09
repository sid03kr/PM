import java.sql.Connection;
import java.sql.DriverManager;

import org.junit.Test;
 
public class MySQLConnectionTest {
 
    // private static final String DRIVER = "com.mysql.cj.jdbc.Driver";
    private static final String DRIVER = "com.mysql.jdbc.Driver";
    private static final String URL = "jdbc:mysql://192.168.0.224:3306/portfolio?useUnicode=yes&amp;characterEncoding=utf8";
    private static final String USER = "covid19";
    private static final String PW = "20131001";
    
    @Test
    public void testConnection() throws Exception{
        
        Class.forName(DRIVER);
        
        try(Connection con = DriverManager.getConnection(URL, USER, PW)){
            System.out.println(con);
            
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
