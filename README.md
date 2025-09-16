# FT_TRANSCENDENCE

<!-- Description of the project    -->

<!-- ## Final score
<div align=center>
<img src="https://github.com/SimonIsCoding/utils_and_random/blob/main/ft_irc_grade.png"/>
</div> -->

## How to setup the project ?
### Requirements
0. **Requirements**
    - We work with nodejs and npm in this project. Make sure you have them installed in you computer.
    - Make sure you have docker & docker-compose installed in you computer.

1. **Download the project**
    ```
    git clone git@github.com:SimonIsCoding/ft_transcendence.git ft_transcendence
    cd ft_transcendence
    make
    <!-- xdg-open https://localhost:4443 -->
    ```

2. **check on web browser**
   - Open any web browser. You should put on the URL: 'https://localhost:4443' - for the project we use the port 4443. For the moment, it is not availble in https (443) in campus computers.
   Then you have to accept the risk to proceed to an unsecure website because we have a self-signed certificate.
   - For Devops Module - Infrastructure setup for log management:
   You can check the url: http//localhost:5051
   Then you have to put as credentials: login: password: to connect.
   You can discover all the setup done for log management.

> [!NOTE]
> In this project, we intentionally left the “/secrets” folder and “.env” file containing secret keys so that every user can view the project, as it is an educational project. In a professional project, we know we should not publicly share these files.

## Modules Done
**WEB**
◦ Major module: Use a framework to build the backend.
◦ Minor module: Use a framework or a toolkit to build the frontend.
◦ Minor module: Use a database for the backend

**User Management**
◦ Major module: Standard user management, authentication, users across
tournaments.
◦ Major module: Implementing a remote authentication.

**AI-Algo**
◦ Major module: Introduce an AI opponent.
◦ Minor module: User and game stats dashboards

**Cybersecurity**
◦ Minor module: GDPR compliance options with user anonymization, local
data management, and Account Deletion.
◦ Major module: Implement Two-Factor Authentication (2FA) and JWT.

**Devops**
◦ Major module: Infrastructure setup for log management.
◦ Major module: Designing the backend as microservices.

**Accessibility**
◦ Minor module: Expanding browser compatibility
