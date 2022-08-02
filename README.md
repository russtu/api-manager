# SPORT MANAGER API


## INTRODUCTION

-  Se trata de una api que gestione clubes, jugadores y entrenadores.
-  It is an api that manages clubs, players and coaches.


## Endpoints

### CLUB

-   GET - [/manager/club/:clubId/players] - Retorna el listado de jugadores según su club. / Returns the list of players according to their club.

-   GET - [/manager/club/:clubId/players?name=keyword] - Retorna el listado de jugadores según su club y con la posibilidad de filtrar por su nombre. / Returns the list of players according to their club and with the possibility of filtering by name.

-   POST - [/manager/club/add] - Añade un club. / Add a club
.
-   PATCH - [/manager/club/:clubId/addPlayer] - Da de alta aun jugador en un club. / Register a player in a club.

-   PATCH - [/manager/club/:clubId/addCoach] - Da de alta a un entrenador en un club. / Register a coach in a club.

-   PATCH - [/manager/club/:clubId/editBudget] - Modifica el presupuesto de un club. Modify a club budget.

-   PATCH - [/manager/club/drop/:playerId] - Dar de baja a un jugador de un club. / Drop a player from a club.

-   PATCH - [/manager/club/drop/:coachId] - Dar de baja a un entrenador de un club. / Drop a coach from a club.

### PLAYER

-   POST - [/manager/player/add] - Añade un jugador. / Add a player         

### COACH

-   POST - [/manager/coach/add] - Añade un entrenador. / Add a coach





#### EXPLAIN ENDPOINTS  

-    GET - [/manager/club/:clubId/players] Example:

  Note: You have to send, in the url, the id of the club where the players belong.


  return list of players like this:

    [
    {
        "id": 1,
        "name": "Manuel",
        "age": 23,
        "country": "Spain",
        "salary": 40000,
        "club_id": 1
    },

    {
        "id": 2,
        "name": "Nahuel",
        "age": 25,
        "country": "Colombia",
        "salary": 60000,
        "club_id": 2
    },

    {
        "id": 3,
        "name": "Pedri",
        "age": 21,
        "country": "Spain",
        "salary": 90000,
        "club_id": 2
    }
]

-    GET - [/manager/club/:clubId/players?name=keyword] - Returns the list of players according to their club and with the possibility of filtering by name.

  Note: You have to send, in the url, the id of the club where the players belong.
  url example: [/manager/club/:clubId/players?name=Pedri]

  Output example:

      {
        "id": 3,
        "name": "Pedri",
        "age": 21,
        "country": "Spain",
        "salary": 90000,
        "club_id": 2
     }


-    POST - [/manager/club/add] - Add a club

  You have to send this JSON format :

      {
        "name": "Alaves",
        "budget": 99000000,
        "location": "Vitoria"
      }

-    PATCH - [/manager/club/:clubId/addPlayer] - Register a player in a club.


  Note: You have to send, in the url, the id of the club where you want to register the player.
  You have to send this JSON format :

      {
        "playerId": "1",
        "salary": 3000000
      }

-    PATCH - [/manager/club/:clubId/addCoach] - Register a coach in a club.


  Note: You have to send, in the url, the id of the club where you want to register the coach.
  You have to send this JSON format :

      {
        "coachId": "1",
        "salary": 3000000
      }

-    PATCH - [/manager/club/:clubId/editBudget] - Modifica el presupuesto de un club. Modify a club budget.

  Note: You have to send, in the url, the id of the club where you want to modify budget.
    You have to send this JSON format :

      {
         "newBudget": "89000000"
      }

-    PATCH - [/manager/club/dropPlayer/:playerId] - Drop a player from a club.

  Note: You have to send, in the url, the id of the player you want to drop from the club.


-    PATCH - [/manager/club/dropCoach/:coachId] - Drop a coach from a club.

  Note: You have to send, in the url, the id of the coach you want to drop from the club.


-    POST - [/manager/player/add] - Create a player

  You have to send this JSON format :

      {
        "name": "Raphinha",
        "age": 23,
        "country": "Brasil"
      }

-    POST - [/manager/coach/add] - Create a coach

  You have to send this JSON format :

      {
        "name": "Xavi",
        "age": 42,
        "country": "Spain"
      }


## Environment Variables

-     In the .env configuration file we can find the environment variables necessary for the execution of the api:  
        Server variables.
        Database variables. In this case: MYSQL
        The variables of sending emails. SMTP
        The email variable where you want the registration and cancellation emails of players and coaches to be sent.
