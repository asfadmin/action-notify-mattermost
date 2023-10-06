const core = require('@actions/core');
const github = require('@actions/github');
const httpm = require('@actions/http-client');


async function run() {
  const webhookUrl = core.getInput('webhook-url');
  const channel = core.getInput('channel');
  const text = core.getInput('text');
  const username = core.getInput('username');
  const iconUrl = core.getInput('icon-url');

  const {owner, repo} = github.context.repo;
  const runUrl = `https://github.com/${owner}/${repo}/actions/runs/${github.context.runId}`

  const http = new httpm.HttpClient('action-notify-mattermost');

  let payload = {
    text: `**${repo}** Build ${github.context.runNumber} on \`${process.env.GITHUB_REF_NAME}\` ${text}: [Build](${runUrl})`,
    channel: channel,
    username: username,
    icon_url: iconUrl,
  }

  await http.postJson(webhookUrl, payload);
}

run();
