describe('template spec', () => {
  const id = 1111

  it('Создать нового питомца', () => {
        
    cy.request({
      url: 'https://petstore.swagger.io/v2/pet',
      method: 'POST',
      body: {
        "id": id,        
        "name": "DOGy",        
        "status": "available"
        }
    }).then((responce) => {
      expect(responce.status).to.eq(200)
      expect(responce.body.id).to.eq(id)
      expect(responce.body.name).to.eq('DOGy')
    })
    
    cy.request('https://petstore.swagger.io/v2/pet/' + id).then(({status, body}) => {
      expect(status).to.eq(200)
      expect(body.id).to.eq(id)
    })
  })

  it('Удаление нового питомца', () => {
        
    cy.request({
      url: 'https://petstore.swagger.io/v2/pet/' + id,
      method: 'DELETE',
    }).then((responce) => {
      expect(responce.status).to.eq(200)
    })
    
    cy.request({
      url: 'https://petstore.swagger.io/v2/pet/' + id,
      failOnStatusCode: false,
    }).then(({status}) => {
      expect(status).to.eq(404)
    })
  })

})