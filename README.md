# FT_TRANSCENDENCE

<!-- Description of the project    -->

> [!NOTE]
> The demo file is a bit heavy. Wait for it to be displayed. I had to put the video 1.35x faster to lighten it.
<p align="center">
  <img src="assets/ft_transcendence_demo.mp4" alt="ft_transcendence demo" width="1000"/>
</p>

## Final score
<div align=center>
<img src="https://github.com/SimonIsCoding/utils_and_random/blob/main/ft_irc_grade.png"/>
</div>

## How to setup the project ?
0. **Requirements**
    - We work with nodejs and npm in this project. Make sure you have them installed in you computer.
    - Make sure you have docker & docker-compose installed in you computer.

1. **Download the project**
    ```
    git clone git@github.com:SimonIsCoding/ft_transcendence.git ft_transcendence
    cd ft_transcendence
    make
    ```

2. **check on web browser**
   - Open any web browser. You should put on the URL: https://localhost:4443 - for the project we use the port 4443. Then you have to accept the risk to proceed to an unsecure website because we have a self-signed certificate.
   - For Devops Module - Infrastructure setup for log management:
   You can check the URL: http://localhost:5601<br>
   Then to connect, you have to put as credentials: <br>login: elastic<br>password: ElasticPass123!<br>
   You can discover all the setup done for log management.

> [!NOTE]
> In this project, we intentionally left the “/secrets” folder and “.env” file containing secret keys so that every user can view the project, as it is an educational project. In a professional project, we know we should not publicly share these files.

## Modules Done
**WEB**
<br>    ◦ Major module: Use a framework to build the backend.
<br>    ◦ Minor module: Use a framework or a toolkit to build the frontend.
<br>    ◦ Minor module: Use a database for the backend

**User Management**
<br>    ◦ Major module: Standard user management, authentication, users across
tournaments.
<br>    ◦ Major module: Implementing a remote authentication - Here's the Google Sign-in

**AI-Algo**
<br>    ◦ Major module: Introduce an AI opponent.
<br>    ◦ Minor module: User and game stats dashboards

**Cybersecurity**
<br>    ◦ Minor module: GDPR compliance options with user anonymization, local
data management, and Account Deletion.
<br>    ◦ Major module: Implement Two-Factor Authentication (2FA) and JWT.

**Devops**
<br>    ◦ Major module: Infrastructure setup for log management.
<br>    ◦ Major module: Designing the backend as microservices.

**Accessibility**
<br>    ◦ Minor module: Expanding browser compatibility

## Advices
As written in the subject, and after doing it, it's totally true:<br>
1 - think about your design before starting coding anything - it will save you soooo much time & you will be proud of it at the end.<br>
2 - This project is definitely a long run, and a wrong path will lead you to a huge loss
of time. Your project management and team management choices will strongly impact
your timeline and results.<br>
3 - Read the subject many times and choose the modules wisely. It is not because you don't understand the module that it is not interesting, it can be quite the opposite.<br>
4 - From the beginning, and during the whole project, organise your folders, subfolders and files very well. There is so many files that you can be quickly lost. I would suggest you to firstly create two main folders, the first one for the backend and the second one for the frontend, as we did. And then one folder for each services you use (for the backend).<br>
5 - I would suggest you to design the backend as microservices. It is easier to build and easier to debug. Moreover, it is quicker to recompile.<br>
6 - Use tailwind to design your pages, it gives you a minor module and save you a lot of lines of code and time.<br>
