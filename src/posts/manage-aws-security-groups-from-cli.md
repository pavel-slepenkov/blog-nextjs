---
title: 'Manage AWS security groups with AWS CLI and bash'
date: '2021-05-31T12:45:00+00:00'
status: publish
permalink: '/?p=1074'
author: pavel
excerpt: ''
type: post
id: manage-aws-security-groups-from-cli
tag:
    - aws
    - bash
    - security
---

Securing your account is one of the first actions you need to take on any IT environment you manage.
When it comes to a remote work you might often need to switch places from where you're working, or your home network can be using a dynamic IP address.

<ps1>VPN</ps1> is preferable solution to access a work network first and then connect to any resources you need in AWS. But sometime it's just convinient to whitelist your current IP address directly in AWS. Unstable VPN connection might be the example of such circumstances.

One way to do so is to edit inbound rules via AWS management console. It works if you need to modify just one security group with a few ports. But when you need to add a several ports into several groups there're too many clicks.  So, let's automate it.

If you're working with AWS you'd probably have **aws cli** installed on your machine. If not, you have to install it. It's increadibly useful tool for AWS management. For our task we need just 2 commands

```bash
aws ec2 authorize-security-group-ingress
aws ec2 revoke-security-group-ingress
```
Its names are self-descriptive so a problem might appear only with dynamic content. First we need our IP address which we would like to add to a security group. Another thing which we'd like to have is dynamic group description which allows to distinguish security rules in AWS console.
I have an alias for obtaining my current IP address in my **.bashrc**
```bash
alias ip='dig +short myip.opendns.com @resolver1.opendns.com'
```
I will generate description with just adding a date, so adding my current IP address to the security group with access on 22 port looks like this
```bash
aws ec2 authorize-security-group-ingress \
    --group-name "securityGroupName" \
    --ip-permissions IpProtocol=tcp,FromPort=22,ToPort=22,IpRanges="$eval [{CidrIp="$(ip)/32", Description="Pavel__$(date +%F)__tmp"}]" \
    --output text
```

Removing address from a security group requires a name of security group, port and IP address which we're removing

```bash
aws ec2 revoke-security-group-ingress --group-name "securityGroupName" --protocol tcp --port 22 --cidr "$(ip)/32"
```
With this knowledge we can develop a short bash script which will do all the work for us.
Basically we just need to add current address to a security groups we want and remove old ones. In order to know the old IP we need to store it somewhere. File in the same directory looks good.

**Final script looks like that**

```bash
#! /bin/bash
# create empty file if the file doesn't exist
filename='ips_in_aws.txt'
if [ ! -e "$filename" ] ; then
    touch "$filename"
fi
# get previous run IP from a file
while read p; do
    old_ip=$p
done < $filename
echo "old ip     = $old_ip"
current_ip=$(ip)
echo "current ip = $current_ip"
if [[ $old_ip == "" || $old_ip != $current_ip ]]; then
    echo "save new IP to the file"
    echo $current_ip >> ips_in_aws.txt
    # ssh access
    for groupName in "sec_group1_name" "sec_group2_name"; do
        if [[ $old_ip != "" ]]; then
            echo "remove old IP from $groupName"
            aws ec2 revoke-security-group-ingress --group-name "$groupName" --protocol tcp --port 22 --cidr "$old_ip/32"
        fi
        echo "add rule for $current_ip to $groupName"
        aws ec2 authorize-security-group-ingress --group-name "$groupName" --ip-permissions IpProtocol=tcp,FromPort=22,ToPort=22,IpRanges="$eval [{CidrIp="$current_ip/32", Description="Pavel__$(date +%F)__tmp"}]" --output text
    done
    # remove old IP from security groups
    if [[ $old_ip != "" ]]; then
        aws ec2 revoke-security-group-ingress --group-name "sec_group1_name" --protocol tcp --port 5432 --cidr "$old_ip/32"
        aws ec2 revoke-security-group-ingress --group-name "sec_group2_name" --protocol tcp --port 443 --cidr "$old_ip/32"
        aws ec2 revoke-security-group-ingress --group-name "sec_group3_name" --protocol tcp --port 5439 --cidr "$old_ip/32"
    fi
    # Postgres, Redshift and web access
    aws ec2 authorize-security-group-ingress --group-name "sec_group3_name" --ip-permissions IpProtocol=tcp,FromPort=5439,ToPort=5439,IpRanges="$eval [{CidrIp="$current_ip/32", Description="Pavel__$(date +%F)__tmp"}]" --output text
    aws ec2 authorize-security-group-ingress --group-name "sec_group1_name" --ip-permissions IpProtocol=tcp,FromPort=5432,ToPort=5432,IpRanges="$eval [{CidrIp="$current_ip/32", Description="Pavel__$(date +%F)__tmp"}]" --output text
    aws ec2 authorize-security-group-ingress --group-name "sec_group2_name" --ip-permissions IpProtocol=tcp,FromPort=443,ToPort=443,IpRanges="$eval [{CidrIp="$current_ip/32", Description="Pavel__$(date +%F)__tmp"}]" --output text
else
    echo "IPs are the same, exit"
fi
```

After running the script you get IP added to specified security groups

