export const truncateHtml = (desc: string): string => {
    return desc.replace(/<[^>]*>?/gm, '');
};
