const core = require('@actions/core');
const github = require('@actions/github');
const execSync = require("child_process").execSync;

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);

  // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2);  
  // console.log(`The event payload: ${payload}`);

  // test writes to env and masking
  const processCommand = `echo "TEST_WRITE=github_file" >> $GITHUB_ENV`;
  execSync(processCommand, { stdio: "inherit" });

  core.exportVariable('TEST_VISIBLE', 'unhidden');
  core.exportVariable('TEST_HIDDEN', 'hidden');
  core.setSecret('hidden');

  console.log(`Complete`);
} catch (error) {
  core.setFailed(error.message);
}