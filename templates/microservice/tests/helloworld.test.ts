import { expect } from 'chai';
import { HelloWorldService } from '../src/services/hello-world/hello-world.service';

describe('HelloWorld Service Test', () => {
    it('Checking for Hello World beeing the right string', () => {

        const helloWorldService:HelloWorldService = HelloWorldService.Instance;

        //Check for hello World string not beeing Bye World
        expect(helloWorldService.getHelloWorld() === 'Bye World').to.be.false;

        //Check for string beeing Hello World
        expect(helloWorldService.getHelloWorld()).to.equal('Hello World');

        //Check for beeing a string with length 11
        expect(helloWorldService.getHelloWorld()).to.be.an("string").to.have.length(11);
    });
});
