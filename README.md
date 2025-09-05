# FT_TRANSCENDENCE

<!-- Description of the project    -->

<!-- ## Final score
<div align=center>
<img src="https://github.com/SimonIsCoding/utils_and_random/blob/main/ft_irc_grade.png"/>
</div> -->

## How to setup the project ?
### Go fast
1. **to go faster**
    ```
    git clone git@github.com:SimonIsCoding/ft_transcendence.git ft_transcendence
    cd ft_transcendence
    echo "DOMAIN_NAME=localhost" > srcs/.env
    make
    xdg-open http://localhost:4443
    ```

### To know what you are doing
0. **Make sure you have the good prerequisite for your computer**
   - We work with nodejs and npm in this project. Make sure you have them installed in you computer.
   - Make sure you have docker installed in you computer
   - the file /etc/hosts has the line `127.0.0.1 localhost`

1. **clone the project**
   - `git clone git@github.com:SimonIsCoding/ft_transcendence.git ft_transcendence`

2. **Create a .env file**
   - go to ft_transcendence repository `cd ft_transcendence`
   - go to srcs folder `cd srcs`
   - create a .env file
   - add a domain name `DOMAIN_NAME=localhost`
   - then go back to the root of the project `cd ..`

2. **Run the project**
   - `make`

3. **check on web browser**
   - Open any web browser. You should put on the URL: 'http://localhost:4443' - for the project we use the port 4443. For the moment, it is not availble in https (443) in campus computers.
