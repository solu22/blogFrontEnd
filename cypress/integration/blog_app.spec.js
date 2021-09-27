/* eslint-disable no-undef */
describe('Blog app',  function() {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'gmail',
      username: 'gmail',
      password: 'gmail'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('login page is shown initially', function(){
    cy.visit('http://localhost:3000')
    cy.contains('Log in')
  })
  
  describe('login function', function(){
    it('login form can be opened', function() {
      cy.visit('http://localhost:3000')
      cy.contains('Log in').click()
    })

    it('user can login with correct credentials', function(){
      cy.contains('Log in').click()
      cy.get('#username').type('gmail')
      cy.get('#password').type('gmail')
      cy.get('#login').click()
      cy.contains('successfully login welcome gmail')
    })

    it('login fails with wrong password', function() {
      cy.contains('Log in').click()
      cy.get('#username').type('gmail')
      cy.get('#password').type('wrong')
      cy.get('#login').click()
    
      cy.get('.error')
        .should('contain', 'invalid credentials')
        .and('have.css', 'color', 'rgb(128, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    
      cy.get('html').should('not.contain', 'gmail logged in')
    })

  })

    describe('when logged in user found', function(){
      beforeEach(function(){
       cy.login({username: 'gmail', password:'gmail'})
      })

    it('a new blog can be created', function() {
      cy.contains('Add new blog').click()
      cy.get('#title').type('new blog')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www.cypress.com')
      cy.get('#likes').type(22)
      cy.get('#save').click()
      cy.contains('new blog')
      cy.contains('cypress')
      cy.contains('www.cypress.com')
      cy.contains(22)
    })

    it('user can like a blog', function(){
      cy.createBlog({title:'deltest', author:'deltest', url:'deltest.com', likes:'2'})
      cy.contains('view').click()
      cy.get('.blog-likes').contains('2')
      cy.get('#like').click()
      cy.get('.blog-likes').contains(3)
    })

    it('A blog can be deleted by creator', function(){
      cy.createBlog({title:'deltest', author:'deltest', url:'deltest.com', likes:'2'})
      cy.contains('view').click()
      cy.get('#remove').click()
      cy.get('html').should('not.contain', 'deltest deltest')
 
    })

    it('blogs are ordered by max-likes ', function(){
      cy.createBlog({title:'maxtest', author:'maxtest', url:'maxtest.com', likes:'1'})
      cy.createBlog({title:'maxtest', author:'maxtest', url:'maxtest.com', likes:'5'})
      cy.contains('view').click()
      cy.contains('5')
    })
   
    it('other user cannot delete post', function(){
      cy.login({username:'gmail', password:'gmail'})
        cy.createBlog({
          title:'other test',
          author:'test',
          url:'othertest.com',
          likes:'22'
        })

          cy.get('#logout').click()
          const user = {
            name: 'new',
            username: 'new',
            password: 'new'
          }
          cy.request('POST', 'http://localhost:3003/api/users/', user) 
          cy.visit('http://localhost:3000')
          cy.login({username:'new', password:'new'})
          cy.contains('other test by test')
          cy.contains('view').click()
          cy.contains('remove').should('not.exist')
        })
      })
    })  


 
  

  

   
   

    


  

 
  
  
  

  
