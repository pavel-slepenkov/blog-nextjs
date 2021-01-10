import { getSortedPostsData } from './posts'
import {convert_tag_to_path} from './utils'

export function getAllTags() {
    const postData = getSortedPostsData();
    let result = {};
    postData.forEach(p => {
        if (p.tag) {
            for(let i=0; i < p.tag.length; i++) {
                let tag = convert_tag_to_path(p.tag[i]);
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
