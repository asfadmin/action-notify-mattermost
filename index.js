const core = require('@actions/core');
const github = require('@actions/github');
const httpm = require('@actions/http-client');


async function run() {
  const webhookUrl = core.getInput('webhook-url');
  const channel = core.getInput('channel');
  const text = core.getInput('text');
  let statuses = core.getInput('statuses');
  const username = core.getInput('username');
  const iconUrl = core.getInput('icon-url');

  const {owner, repo} = github.context.repo;
  const runUrl = `https://github.com/${owner}/${repo}/actions/runs/${github.context.runId}`

  const http = new httpm.HttpClient('action-notify-mattermost');

  let attachments = [];
  if (statuses) {
    statuses = JSON.parse(statuses);
    const failed = statuses.filter((status) => status.status == 'failure');

    if (failed?.length) {
      attachments.push({
        fallback: `Failed statuses: ${failed.map((status) => status.name)}`,
        title: 'Failed Statuses',
        color: '#FFBDBD',
        fields: failed.map((status) => (
          {
            title: status.name,
            value: status.status,
            short: true,
          }
        )),
      });
    }
    else {
      statusText = statuses.map(
          (status) => `${status.name}: ${status.status}`
      ).join(', ');

      attachments.push({
        fallback: `Statuses: ${statusText}`,
        text: `Statuses: ${statusText}`,
        color: '#CEEBD3',
      });
    }
  }

  let payload = {
    text: `**${repo}** Build ${github.context.runNumber} on \`${process.env.GITHUB_REF_NAME}\` ${text}: [Build](${runUrl})`,
    icon_url: iconUrl,
    channel,
    username,
    attachments,
  };

  await http.postJson(webhookUrl, payload);
}

run();
