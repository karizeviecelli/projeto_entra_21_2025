# Imagem base com Java
FROM eclipse-temurin:23-jdk-alpine

# Diretorio de trabalho dentro do container
WORKDIR /app

# Copia o .jar compilado pro container
COPY target/service-hub-0.0.1-SNAPSHOT.jar app.jar

# Expõe a porta que o Spring Boot vai usar
EXPOSE 8080

# Comando pra rodar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]