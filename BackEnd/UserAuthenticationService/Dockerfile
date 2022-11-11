FROM openjdk
WORKDIR usr/lib
ENV MYSQL_DATABASE=userAuthentication
ENV MYSQL_URL=jdbc:mysql://localhost:3306/userAuthentication
ADD ./target/UserAuthenticationService-0.0.1-SNAPSHOT.jar /usr/lib/UserAuthenticationService-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","UserAuthenticationService-0.0.1-SNAPSHOT.jar"]