# Expense tracker app to keep track of monthly savings, income and expenses.

This app uses [spring boot](https://spring.io/projects/spring-boot) and h2 database for the backend and [React](https://reactjs.org/) client for frontend.  

## Running the Application
There are two ways to run the application :  using `mvn spring-boot:run` or by running the `Application` class directly from your IDE.

You can use any IDE of your preference,but we suggest Eclipse or Intellij IDEA.
Below are the configuration details to start the project using a `spring-boot:run` command. Both Eclipse and Intellij IDEA are covered.

If you want to run the application locally in the production mode, use `spring-boot:run -Pproduction` command instead.

## Running the client
- Go to et-client folder and issue cmd `yarn start`

## Project overview

Project follow the Maven's [standard directory layout structure](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html):
- Under the `srs/main/java` are located Application sources
   - `Application.java` is a runnable Java application class and a starting point.
- Under the `srs/test` are located test files
- `src/main/resources` contains configuration files and static resources
- Under `et-client` is a client application developed in react and bootstrap, still in development mode.

# Backend

Backend of the app, tries to use the hexagonal architecture philosophy to keep the domain and adapaters/ports around it
separate from each other so that domain can be tested without any dependencies, and it would not be affected if any of 
the technology decision later i.e using kafka instead of active mq later, using postgresql db instead of h2, exposing graphql
interface for UI client.

It is purely for learning purpose, so feedback and comments are welcome. Thanks
