Endpoints

POST, PUT and DELETE and delete requests require bearer token to be sent in the authorization header.

### Authentication route

#### Login users

#### Use hardcoded user data John & Jane

* URL:
    * ``/auth/login``
* Method
    * ``POST``
        * Body
            * username
            * password
        * Query
            * None
* Response:
    * If successful, response will contain a token which should be stored somewhere depending on platform, shared prefs,
      cookies, local or session storage...

#### Get all stations

* URL:
    * ``/station``
* Method
    * ``GET``
        * Body
            * None
        * Query
            * Optional query parameter to limit the amount of stations returned, defaults to 10
* Response:
    * List of all stations
      <br></br>

### Post a new station

* URL:
    * ``/station``
* Method
    * ``POST``
        * Body
            * Connections, with required connection(s) posting object
            * Stations, with required station posting object
        * Query
            * None
* Response:
    * New station inserted
      <br></br>

### Get stations based on polygon

* URL:
    * ``/station/area``
* Method
    * ``GET``
        * Body
            * None
        * Query
            * topRight in format {"lat":60.2821946,"lng":25.036108}
            * bottomLeft in format {"lat":60.1552076,"lng":24.7816538}
* Response:
    * List of all stations matching given geojson
      <br></br>

### Get a single station by its id

* URL:
    * ``/station/{id}``
* Method
    * ``GET``
        * Body
            * None
        * Query
            * None
* Response:
    * A single station
      <br></br>

### Update a single station by its id

* URL:
    * ``/station/{id}``
* Method
    * ``PUT``
        * Body
            * Connections, with required connection(s) posting object
            * Station, with required station posting object
        * Query
            * None
* Response:
    * Response if the station was updated
      <br></br>

### Delete a single station by its id

* URL:
    * ``/station/{id}``
* Method
    * ``DELETE``
        * Body
            * None
            * None
        * Query
            * None
* Response:
    * Response telling if deletion was successful
      <br></br>

