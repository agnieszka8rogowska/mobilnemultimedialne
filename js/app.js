// replace these values with those generated in your TokBox Account
var apiKey = "47008354";
var sessionId = "1_MX40NzAwODM1NH5-MTYwNjU3NDQxNzYxMn5wa2FkdEJqUjA0YU5EZzBrTHZnR1poR0Z-fg";
var token = "T1==cGFydG5lcl9pZD00NzAwODM1NCZzaWc9ZGRiNzQ0NGFjM2FiZjVjNjgxOGZjYzA5NjExZDllMWUxNjkxMzJiYTpzZXNzaW9uX2lkPTFfTVg0ME56QXdPRE0xTkg1LU1UWXdOalUzTkRReE56WXhNbjV3YTJGa2RFSnFVakEwWVU1RVp6QnJUSFpuUjFwb1IwWi1mZyZjcmVhdGVfdGltZT0xNjA2NTc0NDQ0Jm5vbmNlPTAuNzAzMDExNTg1Mzc5NjE1NyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjA2NTc4MDQ0JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

// (optional) add server code here
var SERVER_BASE_URL = 'https://rogowskakosmala.herokuapp.com';
fetch(SERVER_BASE_URL + '/session').then(function(res) {
  return res.json()
}).then(function(res) {
  apiKey = res.apiKey;
  sessionId = res.sessionId;
  token = res.token;
  initializeSession();
}).catch(handleError);

// Handling all of our errors here by alerting them
function handleError(error) {
    if (error) {
      alert(error.message);
    }
  }
  
  function initializeSession() {
    var session = OT.initSession(apiKey, sessionId);
  
    // Subscribe to a newly created stream
    session.on('streamCreated', function(event) {
        session.subscribe(event.stream, 'subscriber', {
          insertMode: 'append',
          width: '100%',
          height: '100%'
        }, handleError);
      });


    // Create a publisher
    /*The application initializes an OpenTok publisher object with OT.initPublisher(). This method takes three optional parameters:
The DOM element that the publisher video replaces — in this case the publisher div
The properties of the publisher — in this case the insertMode, height, and width attributes
The third parameter (not present in our code) specifies the completion handler
Read more about these options in the OT.initPublisher() reference documentation.*/
    var publisher = OT.initPublisher('publisher', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
    
  
    // Connect to the session
    /*The OT.initSession() method takes two parameters — the OpenTok API key and the session ID. It initializes and returns an OpenTok session object.
The connect() method of the session object connects the client application to the OpenTok session. You must connect before sending or receiving audio-video streams in the session (or before interacting with the session in any way). The connect() method takes two parameters — a token and a completion handler function function(error).
Once the session is connected, we publish to the session with session.publish(publisher).
If the client fails to connect to the OpenTok session, an error object is passed into the completion handler of the connect event — in this case it prints an error message to the console using console.error().*/
    session.connect(token, function(error) {
      // If the connection is successful, publish to the session
      if (error) {
        handleError(error);
      } else {
        session.publish(publisher, handleError);
      }
    });
  }
