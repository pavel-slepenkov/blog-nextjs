export function convert_tag_to_path(tag) {
    if (tag) {
        return tag.replace(/ /g, '-').replace(/'_'/g, '-');
    }
    return ''
}