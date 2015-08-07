var remoteElement = document.getElementById('remote')
var localElement = document.getElementById('local')
var credentials = {"apiKey":"45258342","sessionId":"2_MX40NTI1ODM0Mn5-MTQzODk3NDAwNzQxNn5UM292R2pURHNaK2RRSEdkamkrazdoQ0x-fg","token":"T1==cGFydG5lcl9pZD00NTI1ODM0MiZzaWc9MmY2ZjgyMjIyYzNiZTgxZjdjZjBkNGMyM2RkZDk3YmU2ZTEzMTg0ZDpzZXNzaW9uX2lkPTJfTVg0ME5USTFPRE0wTW41LU1UUXpPRGszTkRBd056UXhObjVVTTI5MlIycFVSSE5hSzJSUlNFZGthbWtyYXpkb1EweC1mZyZjcmVhdGVfdGltZT0xNDM4OTc0MDA3Jm5vbmNlPTAuNzczNzY1MjY0NTQ0NjM2JnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE0MzkwNjA0MDc="}
init(credentials)

function init (credentials) {
  var session = OT.initSession(credentials.apiKey, credentials.sessionId)

  session.connect(credentials.token, function (error) {
    console.log('Session init with error', error)

    var publisher = OT.initPublisher('local', null, console.log.bind(console, 'Publish!'))
    session.publish(publisher, console.log.bind(console,'publish publisher'))
    publisher.on('streamCreated', function (event) {
      console.log('The publisher started streaming.');
    });

    session.on('streamCreated', function (ev) {
      console.log('streamCreated!', ev)
      session.subscribe(ev.stream, 'remote')
    })
  })
}
