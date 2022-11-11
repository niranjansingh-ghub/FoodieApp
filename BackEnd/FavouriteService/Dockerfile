FROM openjdk
WORKDIR usr/lib
ENV MONGO_DATABASE=restaurantdb
ENV MONGO_URL=mongodb://localhost:27017/restaurantdb
ADD ./target/FavouriteService-0.0.1-SNAPSHOT.jar /usr/lib/FavouriteService-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","FavouriteService-0.0.1-SNAPSHOT.jar"]