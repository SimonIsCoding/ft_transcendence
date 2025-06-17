# FT_TRANSCENDENCE

<!-- Description of the project -->

<!-- ## Final score
<div align=center>
<img src="https://github.com/SimonIsCoding/utils_and_random/blob/main/ft_irc_grade.png"/>
</div> -->

<!-- This is a test -->

## How to setup the project ?

0. **Make sure you have docker installed in you computer**

1. **clone the project**
   - `git clone git@github.com:SimonIsCoding/ft_transcendence.git ft_transcendence`

2. **Create a .env file**
   - go to ft_transcendence repository `cd ft_transcendence`
   - go to srcs folder `cd srcs`
   - create a .env file
   - add a domain name `DOMAIN_NAME=localhost` - you can put whatever name you want as long as DOMAIN_NAME variable is written that way. It might be easier if you let localhost.
   - then go back to the root of the project `cd ..`

2. **Run the project**
   - `make`

3. **check on web browser**
   - Open any web browser. You should put on the URL: 'http://localhost:3000' - for the project we use the port 3000. For the moment, is not availble in https.

4. **to go faster for next time**
   - `git clone git@github.com:SimonIsCoding/ft_transcendence.git ft_transcendence`
   - `cd ft_transcendence`
   - `echo "DOMAIN_NAME=localhost" > srcs/.env`
   - `make`
   - `xdg-open http://localhost:3000`