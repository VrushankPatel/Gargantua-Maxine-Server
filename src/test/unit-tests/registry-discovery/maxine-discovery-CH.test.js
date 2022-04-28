var chai = require('chai');
var chaiHttp = require('chai-http');
const app = require('../../../../index');
const config = require('../../../main/config/config');
const { discoveryService } = require('../../../main/service/discovery-service');
const { registryService } = require('../../../main/service/registry-service');
const { constants } = require('../../../main/util/constants/constants');
const { ENDPOINTS, serviceDataSample, httpOrNonHttp } = require('../../testUtil/test-constants');
var should = chai.should();
chai.use(require('chai-json'));
chai.use(chaiHttp);

const fileName = require('path').basename(__filename).replace(".js","");

// Registering fake server to discover afterwards for tests.
registryService.registryService(serviceDataSample);

// We'll check if we're getting same server for multiple endpoint hits.
describe(`${fileName} : API /api/maxine/discover with config with Consistent Hashing`, () => {
    it(`CH discover with NonAPI`, (done) => {
        // Making sure that server selection strategy is CH
        config.serverSelectionStrategy = constants.SSS.CH;

        const response1 = discoveryService.getNode(serviceDataSample.serviceName,serviceDataSample.hostName);

        const response2 = discoveryService.getNode(serviceDataSample.serviceName,serviceDataSample.hostName);

        // Because of consistent hashing, we should expect both the responses same because the ip we're passing is the same.
        response1.should.be.eql(response2);
        done();
    });
});