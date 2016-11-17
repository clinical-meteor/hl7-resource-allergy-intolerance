describe('clinical:hl7-resources-allergy-intollerance', function () {
  var server = meteor();
  var client = browser(server);

  it('AllergyIntollerances should exist on the client', function () {
    return client.execute(function () {
      expect(AllergyIntollerances).to.exist;
    });
  });

  it('AllergyIntollerances should exist on the server', function () {
    return server.execute(function () {
      expect(AllergyIntollerances).to.exist;
    });
  });

});
