const path = require('path')
const async = require('async')
const newman = require('newman')

const PARALLEL_RUN_COUNT = 4 

const parametersForTestRun = {
    collection: path.join(__dirname, 'postman/ImmuDB_api_test.postman_collection.json'), // your collection
    environment: path.join(__dirname, 'postman/local.postman_environment.json'), //your env
    reporters: 'cli', //cli,progress,emojitrain
    iterationCount: 10,
    color: 'on'
};

parallelCollectionRun = function (done) {
    newman.run(parametersForTestRun, done);
};

let commands = []
for (let index = 0; index < PARALLEL_RUN_COUNT; index++) {
    commands.push(parallelCollectionRun);
}

// Runs the Postman sample collection thrice, in parallel.
async.parallel(
    commands,
    (err, results) => {
        err && console.error(err);

        results.forEach(function (result) {
            var failures = result.run.failures;
            console.info(failures.length ? JSON.stringify(failures.failures, null, 2) :
                `${result.collection.name} ran successfully.`);
        });
    });
