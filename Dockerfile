FROM java:8
MAINTAINER Juliana Vaculíková
WORKDIR /app
COPY bin/exercise-server.jar exercise-server.jar
EXPOSE 8080
CMD ["java", "-jar", "exercise-server.jar"]
