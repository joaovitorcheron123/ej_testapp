describe('Testes de API na PetStore', () => {

    const baseUrl = 'https://petstore.swagger.io/v2';
    const petId = 989;
    
    context('POST /pet - Criar pet', () => {
      it('Deve criar um novo pet com sucesso', () => {
        cy.request('POST', `${baseUrl}/pet`, {
          id: petId,
          name: 'Max',
          category: { id: 2, name: 'Cat' },
          status: 'available'
        }).then((response) => {
          const { status, body } = response;
          expect(status).to.eq(200);
          expect(body.id).to.eq(petId);
          expect(body.name).to.eq('Max');
          expect(body.status).to.eq('available');
        });
      });
    });
  
    context('GET /pet/{petId} - Obter pet', () => {
      it('Deve buscar um pet existente pelo ID', () => {
        cy.request('GET', `${baseUrl}/pet/${petId}`).then((response) => {
          const { status, body } = response;
          expect(status).to.eq(200);
          expect(body).to.have.property('id', petId);
          expect(body).to.have.property('name', 'Max');
        });
      });
  
      it('Deve retornar 404 para pet inexistente', () => {
        const invalidPetId = 999999;
  
        cy.request({
          method: 'GET',
          url: `${baseUrl}/pet/${invalidPetId}`,
          failOnStatusCode: false
        }).then((response) => {
          const { status, body } = response;
          expect(status).to.eq(404);
          expect(body.message).to.eq('Pet not found');
        });
      });
    });
  
    context('PUT /pet - Atualizar pet', () => {
      it('Deve atualizar o status de um pet existente', () => {
        cy.request('PUT', `${baseUrl}/pet`, {
          id: petId,
          name: 'Max',
          category: { id: 2, name: 'Cat' },
          status: 'sold'
        }).then((response) => {
          const { status, body } = response;
          expect(status).to.eq(200);
          expect(body.status).to.eq('sold');
        });
      });
    });
  
    context('DELETE /pet/{petId} - Excluir pet', () => {
      it('Deve excluir um pet pelo ID', () => {
        cy.request('DELETE', `${baseUrl}/pet/${petId}`).then((response) => {
          const { status, body } = response;
          expect(status).to.eq(200);
          expect(body.message).to.eq(String(petId));
        });
      });
    });
  
    context('GET /pet/findByStatus - Filtrar pets por status', () => {
      it('Deve obter pets disponíveis', () => {
        cy.request('GET', `${baseUrl}/pet/findByStatus?status=available`).then((response) => {
          const { status, body } = response;
          expect(status).to.eq(200);
          expect(body).to.be.an('array').and.have.length.greaterThan(0);
          body.forEach(pet => {
            expect(pet.status).to.eq('available');
          });
        });
      });
    });
  });
