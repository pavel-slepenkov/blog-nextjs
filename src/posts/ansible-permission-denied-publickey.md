---
title: 'Ansible: Permission denied (publickey) and TeamCity'
date: '2021-02-02T00:30:33+00:00'
permalink: '/?p=1070'
author: pavel
type: post
id: ansible-permission-denied-publickey
tag:
    - ansible
    - deployment
    - deployment errors
    - ansible-playbook
    - git
    - GitHub
post_format: []
---

In many deploy scenarios you need to clone/checkout sources from private repository to remote machine. While with Ansible it should be simple task you can face some nuances.

Cloning private repo requires checking your access rights to this repository and most common way to do this is to use ssh key which has access to the repo. In fact Ansible performs all operations on remote machine via ssh. It should be a piece of cake in this circumstances.

```bash
ansible-playbook -vvv -i inventory deploy.yml --vault-id ~/.my_vault
```

it works just fine before [git clone task](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/git_module.html)

```yml
- name: Pull sources from the repository
  become: yes
  become_user: "{{ project.user }}"
  git: repo={{ repo.url }} dest={{ project.path }}/app/ version={{ repo.branch }} force=yes update=yes
```

and now I got

```bash
<ec2-127-0-0-1.eu-0.compute.amazonaws.com> ESTABLISH SSH CONNECTION FOR USER: pavel

......

fatal: [ec2-127-0-0-1.eu-0.compute.amazonaws.com]: FAILED! => {
    "changed": false,
    "cmd": [
        "/usr/bin/git",
        "fetch",
        "--tags",
        "--force",
        "origin"
    ],
    "invocation": {
        "module_args": {
            "accept_hostkey": true,
            "archive": null,
            "archive_prefix": null,
            "bare": false,
            "clone": true,
            "depth": null,
            "dest": "/home/pavel/app/",
            "executable": null,
            "force": true,
            "gpg_whitelist": [],
            "key_file": null,
            "recursive": true,
            "reference": null,
            "refspec": null,
            "remote": "origin",
            "repo": "git@github.com:TargetProcess/pavel.git",
            "separate_git_dir": null,
            "ssh_opts": null,
            "track_submodules": false,
            "umask": null,
            "update": true,
            "verify_commit": false,
            "version": "my-cool-branch"
        }
    },
    "msg": "Failed to download remote objects and refs:  git@github.com: Permission denied (publickey).
        fatal: Could not read from remote repository.
        Please make sure you have the correct access rights and the repository exists."
}
```

To fix this I suggest to use **ssh forwarding** and forward key from local machine to remote (Key should be added to private repo access list (for GitHub it's a deployment keys))

The first step is to <ps1>allow agent forwarding</ps1>

```bash
# vi ~/.ssh/config
Host *
    StrictHostKeyChecking no

Host ec2-127-0-0-1.eu-0.compute.amazonaws.com
IdentityFile /home/remote_machine_user/.ssh/id_rsa
User pavel
ForwardAgent yes
```

Next step is to <ps1>add your key to ssh agent</ps1>

On ssh session you can do it with commands
```bash
eval `ssh-agent -s`
ssh-add ~/.ssh/id_rsa
```
But it won't work in TeamCity without some configuration via UI.

1. Open project's administartion page and upload SSH Key which you want to add to ssh-agent on build time
![](/images/p1070/1.png)

<hr/>

![](/images/p1070/2.png)

2. Open Build Configuration settings and add **Build Feature** <ps1>SSH agent</ps1>
![](/images/p1070/3.png)

After this build step git clone should work fine and you can start fixing next failed step 🤯🤬
