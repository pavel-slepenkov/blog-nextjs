export function convert_tag_to_path(tag) {
    if (tag) {
        return tag.replaceAll(' ', '-').replaceAll('_', '-');
    }
    return ''
}