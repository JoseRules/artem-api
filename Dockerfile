FROM openjdk:17-jdk-slim
ARG JAR_FILE=target/artem-api-0.0.1.jar
COPY ${JAR_FILE} artem_api.jar
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "artem_api.jar"]