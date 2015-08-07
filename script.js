var remoteElement = document.getElementById('remote')
var localElement = document.getElementById('local')
var credentials = {"apiKey":"45258342","sessionId":"2_MX40NTI1ODM0Mn5-MTQzODk2MzI4MzI1MH4xejlTcjdlMzZ5NjNmeEgyeHVpazg1QW9-UH4","token":"T1==cGFydG5lcl9pZD00NTI1ODM0MiZzaWc9N2I0OTMwYzJmYmEwYjU3MmUzOWU1YWU2OWZiZmQ5ZTQzMjIyNjI1ODpzZXNzaW9uX2lkPTJfTVg0ME5USTFPRE0wTW41LU1UUXpPRGsyTXpJNE16STFNSDR4ZWpsVGNqZGxNelo1TmpObWVFZ3llSFZwYXpnMVFXOS1VSDQmY3JlYXRlX3RpbWU9MTQzODk2MzI4NCZub25jZT0wLjg0OTcwNDYyNDE1MzY3MzYmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTQzOTA0OTY4NA=="}

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
