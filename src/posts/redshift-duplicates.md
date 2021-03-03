---
title: 'Remove Postgres / Redshift duplicates without unique key'
date: '2021-03-03T07:37:23+01:00'
status: publish
permalink: '/?p=1069'
author: pavel
excerpt: ''
type: post
id: redshift-duplicates
tag:
    - aws
    - redshift
    - sql
    - postgres
    - duplicates
---

Sometimes you got duplicates in database and have to deal with it. There's 2 possibilities - you have an auto-generated unique id on the table or not. The first case is very easy

Let say we have table feedback where we collect all the feedbacks given by our users. This table has field `feedback_id` which represents unique id of external system from which data was posted.


<table>
    <thead>
        <tr>
            <th>id</th>
            <th>feedback_id</th>
            <th>type</th>
            <th>date</th>
        </tr>
    </thead>
    <tbody >
        <tr>
            <td>0001</td>
            <td>MX-001</td>
            <td>livechat</td>
            <td>2020-01-01</td>
        </tr>
        <tr>
            <td>0002</td>
            <td>MX-001</td>
            <td>livechat</td>
            <td>2020-01-01</td>
        </tr>
        <tr>
            <td>0003</td>
            <td>MX-001</td>
            <td>livechat</td>
            <td>2020-01-01</td>
        </tr>
        <tr>
            <td>0004</td>
            <td>MX-002</td>
            <td>pendo</td>
            <td>2020-01-03</td>
        </tr>
        <tr>
            <td>0005</td>
            <td>MX-002</td>
            <td>pendo</td>
            <td>2020-01-03</td>
        </tr>
    </tbody>
</table>

If we created an auto-generated Id on it then we safe

```sql
delete from feedback
where id in (
    with dups as (
        select id,
            row_number() over (partition by feedback_id order by date desc) rn
        from feedback
    )
    select id from dups where rn > 1
)
```

But what to do if there's no unique Id? Temporary table is an approach - first we create `feedback_temp` where only unique records from all set of duplicates will be stored.

```sql
CREATE TABLE feedback_temp as (
    with dups as (
        select feedback_id
        from feedback
        group by 1
        having count(*) > 1
    )
    , sorted as (
        select row_number() over (partition by ff.feedback_id order by date desc) rn, f.*
        from feedback f
            right join dups d on d.feedback_id = f.feedback_id
    )
    select * from sorted where rn = 1
);
```

Next step is to remove the duplicates from initial table
```sql
delete from feedback
where feedback_id in (
    select feedback_id
    from feedback
    group by 1
    having count(*) > 1
);
```

Then we just need to insert data back and remove temp table
```sql
BEGIN TRANSACTION;

insert into feedback
(select * from feedback_temp);

drop table feedback_temp;

END TRANSACTION;
```

