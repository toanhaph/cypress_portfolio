describe('API test', () => {
    //Precondition:
    const baseURL: string = 'https://reqres.in/api/';
    const apiKey: string = 'reqres-free-v1';
    // Actions & Assert:
    it('GET user list', () => {
        cy.request({
            url: `${baseURL}users?page=1`,
            headers: {
                "x-api-key": `${apiKey}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.total).to.eq(12);
            expect(response.body.data[0].email).to.contain("george.bluth@reqres.in");
        });
    });
    it('GET single user', () => {
        cy.request({
            url: `${baseURL}users?page=1`,
            headers: {
                "x-api-key": `${apiKey}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data[0].id).to.eq(1);
            expect(response.body.data[0].email).to.contain("george.bluth@reqres.in");
            expect(response.body.data[0].first_name).to.contain("George");
            expect(response.body.data[0].last_name).to.contain("Bluth");
            expect(response.body.data[0].avatar).to.exist;
        });
    });
    it('POST create', () => {
        cy.request({
            method: 'POST',
            url: `${baseURL}users`,
            body: {
               "name": "morpheus",
                "job": "leader" 
            },
            headers: {
                "x-api-key": `${apiKey}`
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.name).to.contain("morpheus");
            expect(response.body.job).to.contain("leader");
            expect(response.body.id).to.exist;
        });
    });
    it('POST register unsuccessful', () => {
        cy.request({
            method: 'POST',
            url: `${baseURL}register`,
            body: {
               "email": "sydney@fife"
            },
            headers: {
                "x-api-key": `${apiKey}`
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.error).to.contain("Missing password");
        });
    });
});