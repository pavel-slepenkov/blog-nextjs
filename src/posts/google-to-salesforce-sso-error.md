---
title: 'Google SSO error with Salesforce [app_not_enabled_for_user]'
date: '2021-01-08T11:30:35+00:00'
status: published
permalink: '/?p=1068'
author: pavel
type: post
id: google-to-salesforce-sso-error
category:
    - blog
tag:
    - 2fa
    - sso
    - salesforce
---

One day your users can get to you with some strange screenshot of an error in Salesforce. They have got it when logging in with Google SSO, they did nothing with SF and it was working just fine for a few years before this issue.

![](/images/p1068/img1.png)

The error itself is not very informative, and you can be stuck with that for many hours. Most probably, you will start checking your latest changes in SSO configuration, global configs. Or you will snoop around your logs, and so on.

```
app_not_enabled_for_user
pli=1
idpid=C04qcda9w
RelayState=/
SAMLRequest=PD81bWfgdaVyc3lvbj0iIS4aIiBlbnN
```

But the issue is very simple and it's on user's side. It's a <ps1>disabled 2-step verification on Google</ps1>

Just ask the user if they did something with their Google Securities config, and, most probably, they will say that it was changed just before  the error appeared

Ask them to re-enable 2fa and error should gone.
![](/images/p1068/img2.png)
