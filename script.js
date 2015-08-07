var remoteElement = document.getElementById('remote')
var localElement = document.getElementById('local')
var credentials = {"apiKey":"45258342","sessionId":"1_MX40NTI1ODM0Mn5-MTQzODk3NDg3NDUzM35ZK3U5Y3YxdXcwMjNadzV6UllXeFc0c0Z-UH4","token":"T1==cGFydG5lcl9pZD00NTI1ODM0MiZzaWc9MDFhNzNmZjM1NGZkZWRjYjk4OTNmNTU3ZDJmZGIyMGRjODc5MGQ0NjpzZXNzaW9uX2lkPTFfTVg0ME5USTFPRE0wTW41LU1UUXpPRGszTkRnM05EVXpNMzVaSzNVNVkzWXhkWGN3TWpOYWR6VjZVbGxYZUZjMGMwWi1VSDQmY3JlYXRlX3RpbWU9MTQzODk3NDg3NCZub25jZT0wLjgxMDcwNjI0NzU3NTU4MTEmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTQzOTA2MTI3NA=="}

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
