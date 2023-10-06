# Notify Mattermost Action

This action sends a mattermost notification with the action build status

## Inputs

### `webhook-url` (required)
Mattermost webhook URL.

### `channel` (required)
Mattermost channel name.

### `text` (required)
Text to insert into the message.

### `statuses`
Add a colored attachment to the message indicating a list of failed and
succeeded statuses.

```yaml
statuses: |
  [
    {"name": "Build Artifact", "status": "success"},
    {"name": "Deploy", "status": "failed"},
    {"name": "Run Report", "status": "skipped"}
  ]

```

### `username`
Mattermost user displayed name

### `icon-url`
Mattermost user displayed icon

## Example usage

```yaml
uses: asfadmin/action-notify-mattermost@v1
with:
  webhook-url: ${{ secrets.MATTERMOST_WEBHOOK_URL }}
  channel: mattermost-channel-name
  text: started
```
