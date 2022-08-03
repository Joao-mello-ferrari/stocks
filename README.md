# Why build a finance application?
I first started investing in 2022. I wanted a platform in which I could take a look on how many stocks I was in hand. I wished I could filter them by paramethers, in order to visualize
the amount of each stock was under my possession. I came across this idea, and it turned out to be an amazing exeperience to develop this projet.

# External APIs used for this project
> In order to use google OAuth, i used the google gapi [Google Auth API](https://developers.google.com/identity/sign-in/web/reference).
> 
> To store data, I used the faunadb service [Fauna DB](https://fauna.com/).

# Check the project for yourself!
> **Project website** - https://stocks.joaomellof.com </br>
> **Youtube Video** - https://youtu.be/Peg5Mx_zU1I </br>

![stocks home screen. Header on top, with user info and logout button. Filters and table right below, showing stocks](https://user-images.githubusercontent.com/67838782/181861838-e968fad6-c5a1-4320-8274-7478240794bd.png "stocks preview") 

# How can i download and run the project?
With simples steps, it will be able to run everything locally.
<ul>
  <li>
    Make sure you have node installed in your computer. <a href="https://nodejs.org/en/">Check their page for more</a>
  </li>
  <li>
    If you want to clone this repository via git, you'll to install it as well. <a href="https://git-scm.com/">Take a look on their home page</a>
  </li>
  <li>
    Then, simply download the code and start the project, like shown below.
  </li>
</ul>


```git
   git clone https://github.com/Joao-mello-ferrari/stocks.git
   cd stocks
   yarn (or npm)
   yarn run dev (or npm run dev)
```
Finally, a .env file must be filled with some api keys ⬇
* The google gapi api needs you to create a project and a secret api key, so the OAuth service will be available.
* The faunaDB requires some API keys as well.

On the .env.example, you should find the apis key names. Just put your secrets and you will be ready to go!

   # Main concepts used within this project
   * **React**
   * **Sass** for advanced css features
   * **Cookies** for keeping some info on client side, which provides a better experience
   * **React Query**, to keep control of cached data and refetch functionalities (performance)
   * **FaunaDB**, to provide a database, which allows the application to be dynamic and used world wide
