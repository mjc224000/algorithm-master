const black = 0;
const red = 1;

class RBNode {
    father = null
    value = null
    left = null
    right = null
    color = red

    constructor(val) {
        this.value = val;
    }
}

class RBTree {
    root = null;

    rotateLeft(node) {
        let r = node.right;
        if (node === this.root) {
            r.father = null;
            this.root = r;
            r.color = black;
        } else {
            let p = node.father;
            if (this.isLeft(node))
                p.left = r;
            else
                p.right = r;
            r.father = p;
        }

        let rl = r.left;
        node.right = rl;
        if (rl)
            rl.father = node;
        r.left = node;
        node.father = r
    }

    rotateRight(node) {
        const l = node.left;
        if (node === this.root) {
            l.father = null;
            this.root = l;
            l.color = black;
        } else {
            let p = node.father;
            if (this.isLeft(node))
                p.left = l;
            else
                p.right = l;
            l.father = p;
        }
        let lr = l.right;
        l.right = node;
        node.left = lr;
        if (lr)
            lr.father = node;
        node.father = l;

    }

    getUncle(node) {
        let p = node.father;
        let pp = node.father.father;
        return pp.left === p ? pp.right : pp.left;
    }

    isLeft(node) {
        return node.father.left === node;
    }

    insert(val) {
        let node = new RBNode(val);
        if (!this.root) {
            this.root = node;
            node.color = black;
            return;
        }
        let cur = this.root;
        while (1) {
            if (val < cur.value) {
                if (cur.left === null) {
                    cur.left = node;
                    break;
                } else {
                    cur = cur.left;
                }
            } else {
                if (cur.right === null) {
                    cur.right = node;
                    break;
                } else {
                    cur = cur.right;
                }
            }
        }
        node.father = cur;
        // 处理红红相连的情况
        while (node.color === red && node.father && node.father.color === red) {
            let uncle = this.getUncle(node);
            /**
             *  1 uncle 不存在或者uncle为黑色。
             */

            if (!uncle || uncle.color === black) {
                /**
                 * 1.1.1 父亲为右子树，n为右子树，以祖父为节点左旋
                 */
                if (!this.isLeft(node) && !this.isLeft(node.father)) {
                    node.father.color = black;
                    node.father.father.color = red;
                    this.rotateLeft(node.father.father);
                    node = node.father;
                    continue;
                }
                /**
                 * 1.1. 2 父亲为右子树，n为左，先父亲右旋转，设当前节点为父亲；
                 */
                if (this.isLeft(node)&& !this.isLeft(node.father)) {
                    this.rotateRight(node.father);
                    node = node.right;
                    continue;
                }
                /**
                 * 1.2.1  父亲为左子树，n为左子树，以祖父为节点右旋。
                 */
                if (this.isLeft(node) && this.isLeft(node.father)) {
                    node.father.color = black;
                    node.father.father.color = red;
                    this.rotateRight(node.father.father);
                    node = node.father;
                    continue;
                }
                /**
                 * 1.2.2 lr相连
                 */
                if (this.isLeft(node.father) && !this.isLeft(node)) {
                    this.rotateLeft(node.father);
                    node=node.left;
                    continue;
                }
            } else {
                /**
                 * 2 叔叔颜色为红
                 */
                uncle.color = black;
                node.father.color = black;
                node.father.father.color = red;
                if (node.father.father === this.root) {
                    this.root.color = black;
                    return;
                } else
                    node = node.father.father;

            }
        }
    }

    travel(node) {
        if (!node)
            return;
        this.travel(node.left)
        console.log(node.value);
        this.travel(node.right);
    }
}

let arr = [];
for (let i = 0; i < 10000000; i++) {
    arr.push(Math.random());
}
let tree = new RBTree();
console.time('s');
arr.forEach(function (val) {

    tree.insert( val);
});

console.timeEnd('s');


