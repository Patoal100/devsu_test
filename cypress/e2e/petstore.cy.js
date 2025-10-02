describe('Pruebas API - Swagger PetStore', () => {
  const baseUrl = 'https://petstore.swagger.io/v2';
  let petId;

  const getPetWithRetry = (id, attempts = 6, delayMs = 800) => {
    const url = `${baseUrl}/pet/${id}`;
    const tryOnce = (left) =>
      cy.request({ method: 'GET', url, failOnStatusCode: false }).then((res) => {
        if (res.status === 200) return res;
        if (left <= 1) expect(res.status, `GET ${url}`).to.eq(200);
        return cy.wait(delayMs).then(() => tryOnce(left - 1));
      });
    return tryOnce(attempts);
  };

  it('Crea una nueva mascota (POST)', () => {
    const newPet = { id: Date.now(), name: 'Firulais', status: 'available' };
    cy.request({
      method: 'POST',
      url: `${baseUrl}/pet`,
      headers: { 'Content-Type': 'application/json', accept: 'application/json' },
      body: newPet,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name', 'Firulais');
      petId = response.body.id;
    });
  });

  it('Obtiene la mascota creada (GET)', () => {
    cy.then(() => getPetWithRetry(petId)).then((res) => {
      expect(res.status).to.eq(200);
      expect(Number(res.body.id)).to.eq(Number(petId));
      expect(res.body.name).to.eq('Firulais');
    });
  });

  it('Actualiza el estado de la mascota (PUT)', () => {
    const updatedPet = { id: petId, name: 'Firulais Updated', status: 'sold' };
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/pet`,
      headers: { 'Content-Type': 'application/json', accept: 'application/json' },
      body: updatedPet,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq('Firulais Updated');
      expect(response.body.status).to.eq('sold');
    });
  });

  it('Verifica que la mascota aparezca en /findByStatus?status=sold', () => {
    const url = `${baseUrl}/pet/findByStatus?status=sold`;
    const poll = (left = 5) =>
      cy.request({ method: 'GET', url, headers: { accept: 'application/json' } }).then((res) => {
        expect(res.status).to.eq(200);
        const ids = res.body.map((p) => Number(p.id));
        if (ids.includes(Number(petId)) || left <= 1) {
          expect(ids).to.include(Number(petId));
          return;
        }
        return cy.wait(800).then(() => poll(left - 1));
      });
    return poll();
  });
});
