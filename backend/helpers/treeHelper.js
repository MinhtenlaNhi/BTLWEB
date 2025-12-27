module.exports.tree = (arr) => {
    const plainArr = JSON.parse(JSON.stringify(arr));

    // Chuẩn hóa id & parentId
    plainArr.forEach(item => {
        item.id = String(item.id || item._id); // lấy id chuẩn
        item.parentId = item.parentId ? String(item.parentId) : "";
        item.children = [];
    });

    const map = new Map();
    plainArr.forEach(item => {
        map.set(item.id, item);
    });

    const roots = [];

    plainArr.forEach(item => {
        if (!item.parentId) {
            roots.push(item);
        } else {
            const parent = map.get(item.parentId);
            if (parent) parent.children.push(item);
        }
    });

    return roots;
};
