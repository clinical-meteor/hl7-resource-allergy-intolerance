// Integration Tests  

describe('clinical:hl7-resources-allergy-intolerance', function () {
  var server = meteor();
  var client = browser(server);

  it('AllergyIntolerances should exist on the client', function () {
    return client.execute(function () {
      expect(AllergyIntolerances).to.exist;
    });
  });

  it('AllergyIntolerances should exist on the server', function () {
    return server.execute(function () {
      expect(AllergyIntolerances).to.exist;
    });
  });
});
