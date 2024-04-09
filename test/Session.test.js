import { strict as assert } from 'assert';
import { SessionsService } from '../src/service/sessions.service.js';
import { userService } from '../src/service/user.service.js'; 

describe('SessionsService', function() {
  describe('authenticate', function() {
    it('Debería autenticar a un usuario con credenciales válidas', async function() {
    
      const sessionsService = new SessionsService({ userRepository: userService.userRepository }); 
      //Mock de Usuario
      const mockLoginCredentials = {
        "username": "Totu",
        "password": "987",
      };
      
      const authenticatedUser = await sessionsService.authenticate(mockLoginCredentials);

      assert.ok(authenticatedUser); 
      assert.strictEqual(authenticatedUser.username, mockLoginCredentials.username); 
    });
  });
});
