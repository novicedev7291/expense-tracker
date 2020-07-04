# Expense tracker app to keep track of monthly savings, income and expenses.

This app uses [spring boot](https://spring.io/projects/spring-boot) and h2 database for the backend and [Vaadin](https://vaadin.com/) ui library for the ui view.  

## Running the Application
There are two ways to run the application :  using `mvn spring-boot:run` or by running the `Application` class directly from your IDE.

You can use any IDE of your preference,but we suggest Eclipse or Intellij IDEA.
Below are the configuration details to start the project using a `spring-boot:run` command. Both Eclipse and Intellij IDEA are covered.

If you want to run the application locally in the production mode, use `spring-boot:run -Pproduction` command instead.

## Project overview

Project follow the Maven's [standard directory layout structure](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html):
- Under the `srs/main/java` are located Application sources
   - `Application.java` is a runnable Java application class and a starting point.
   - `MainLayout.java` is a default view and entry point of the application
- Under the `srs/test` are located test files
- `src/main/resources` contains configuration files and static resources
- The `frontend` directory in the root folder contains client-side dependencies and resource files
   - All CSS styles used by the application are located under the root directory `frontend/styles`    
   - Templates would be stored under the `frontend/src`


# Backend

Backend of the app, tries to use the hexagonal architecture philosophy to keep the domain and adapaters/ports around it
separate from each other so that domain can be tested without any dependencies, and it would not be affected if any of 
the technology decision later i.e using kafka instead of active mq later, using postgresql db instead of h2, exposing graphql
interface for UI client.

It is purely for learning purpose, so feedback and comments are welcome. Thanks
