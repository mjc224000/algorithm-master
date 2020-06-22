class AVLNode {
    h = 1;
    left = null;
    right = null;
    value;
    father;

    constructor(val) {
        this.value = val;
    }
}

class AVLTree {
    root

    travel(node) {
        if (!node)
            return;
        this.travel(node.left)
        console.log(node.value);
        this.travel(node.right);
    }

    isFromLeft


    /**
     *
     * @param node
     * @returns {number} 正数往左倾斜 负数往右倾斜
     */
    d(node) {
        let lh = node.left ? node.left.h : 0;
        let rh = node.right ? node.right.h : 0;
        return lh - rh;
    }

    rotateLeft(node) {
        let r = node.right;
        if (node === this.root) {
            r.father = null;
            this.root = r;
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

    isLeft(node) {
        return node.father.left === node;
    }

    insert(val) {
        this.path = [];
        let node = new AVLNode(val);
        if (!this.root) {
            this.root = node;
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
        while (node != this.root) {
            let p = node.father;
            if (node.h + 1 > p.h) {
                p.h++;
            }
            /**
             * p左倾斜，p右旋转
             */

            if (this.d(p) === 2) {
                if (this.isFromLeft === this.isLeft(node)) {
                    this.rotateRight(p);
                    p.h -= 2;
                } else {
                    p.h -= 2;
                    node.h--
                    node.right.h++;
                    this.rotateLeft(node);
                    this.rotateRight(p);

                }
            } else if (this.d(p) === -2) {
                if (this.isFromLeft === this.isLeft(node)) {
                    this.rotateLeft(p);
                    p.h -= 2;
                 } else {
                    node.left.h++;
                    p.h -= 2;
                    node.h--
                    this.rotateRight(node);
                    this.rotateLeft(p);

                }

            }
            if (node === this.root)
                return;
            this.isFromLeft = this.isLeft(node)
            node = node.father;

        }
    }
}

let min = 999;
let res = [];

let tr = new AVLTree();
console.time('s');
let length=10000000;
for (let i = 0; i <length ; i++) {
    tr.insert(Math.random())
}
console.timeEnd('s')
//tr.travel(tr.root)



