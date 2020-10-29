import app from './app'                             // Import app from the app.js
import './db'

app.set( 'port', process.env.PORT || 3000 );        // Set port number to the server, if exist a defined port take that if not put port in 3000
app.set( 'json spaces', 2 );

// Starting server
app.listen( app.get('port'), () => {
    console.log(`Server on port ${ app.get('port') }`);
} );