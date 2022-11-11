FROM openjdk
WORKDIR usr/lib
ENV MONGO_DATABASE=restaurantdb
ENV MONGO_URL=mongodb://localhost:27017/restaurantdb
ADD ./target/RestaurantService-0.0.1-SNAPSHOT.jar /usr/lib/RestaurantService-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","RestaurantService-0.0.1-SNAPSHOT.jar"]