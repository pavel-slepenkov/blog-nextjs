import { getSortedPostsData } from './posts'

export function getAllTags() {
    const postData = getSortedPostsData();
    let result = {};
    postData.forEach(p => {
        if (p.tag) {
            for(let i=0; i < p.tag.length; i++) {
                let tag = p.tag[i].replaceAll(' ', '-').replaceAll('_', '-');
                if (result[tag]) {
                    let tmp = result[tag];
                    tmp.push({"postId": p.id, "title": p.title, "date": p.date});
                } else {
                    result[tag] = [{ "postId": p.id, "title": p.title, "date": p.date }];
                }
            }
        }
    });

    return result;
}
