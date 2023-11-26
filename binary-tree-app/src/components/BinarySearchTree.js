function BinarySearchTree() {
    this.root = null;
}

BinarySearchTree.prototype = {
    constructor: BinarySearchTree,

    add: function(value) {
        var node = {
            value: value,
            left: null,
            right: null
        };

        if (this.root === null) {
            this.root = node;
        } else {
            var current = this.root;
            while (true) {
                if (value < current.value) {
                    if (current.left === null) {
                        current.left = node;
                        break;
                    } else {
                        current = current.left;
                    }
                } else if (value > current.value) {
                    if (current.right === null) {
                        current.right = node;
                        break;
                    } else {
                        current = current.right;
                    }
                } else {
                    break;
                }
            }
        }
    },

    contains: function(value) {
        var found = false;
        var current = this.root;
        
        while (!found && current) {
            if (value < current.value) {
                current = current.left;
            } else if (value > current.value) {
                current = current.right;
            } else {
                found = true;
            }
        }
        return found;     
    },

    traverse: function(process) {
        function inOrder(node) {
            if (node) {
                if (node.left !== null) {
                    inOrder(node.left);
                }

                process.call(this, node);

                if (node.right !== null) {
                    inOrder(node.right);
                }
            }
        }

        inOrder(this.root);
    },

    remove: function(value) {
        var found = false,
            parent = null,
            current = this.root,
            childCount,
            replacement,
            replacementParent;

        while (!found && current) {
            if (value < current.value) {
                parent = current;
                current = current.left;
            } else if (value > current.value) {
                parent = current;
                current = current.right;
            } else {
                found = true;
            }
        }

        if (found) {
            childCount = (current.left !== null ? 1 : 0) + (current.right !== null ? 1 : 0);

            if (current === this.root) {
                switch (childCount) {
                    case 0:
                        this.root = null;
                        break;
                    case 1:
                        this.root = (current.right === null ? current.left : current.right);
                        break;
                    case 2:
                        replacement = this.root.left;
                        replacementParent = null;

                        while (replacement.right !== null) {
                            replacementParent = replacement;
                            replacement = replacement.right;
                        }

                        if (replacementParent != null) {
                            replacementParent.right = replacement.left;
                            replacement.right = this.root.right;
                            replacement.left = this.root.left;
                        } else {
                            replacement.right = this.root.right;
                        }

                        this.root = replacement;
                }    
            } else {
                switch (childCount) {
                    case 0:
                        if (current.value < parent.value) {
                            parent.left = null;
                        } else {
                            parent.right = null;
                        }
                        break;
                    case 1:
                        if (current.value < parent.value) {
                            parent.left = (current.left === null ? current.right : current.left);
                        } else {
                            parent.right = (current.left === null ? current.right : current.left);
                        }
                        break;    
                    case 2:
                        replacement = current.left;
                        replacementParent = current;

                        while (replacement.right !== null) {
                            replacementParent = replacement;
                            replacement = replacement.right;
                        }

                        if (replacementParent.left === replacement) {
                            replacementParent.left = replacement.left;
                        } else {
                            replacementParent.right = replacement.left;
                        }

                        replacement.left = current.left;
                        replacement.right = current.right;

                        if (current.value < parent.value) {
                            parent.left = replacement;
                        } else {
                            parent.right = replacement;
                        }
                }
            }
        }
    },  

    size: function() {
        var length = 0;

        this.traverse(function(node) {
            length++;
        });

        return length;
    },

    toArray: function() {
        var result = [];

        this.traverse(function(node) {
            result.push(node.value);
        });

        return result;
    },   

    toString: function() {
        return this.toArray().toString();
    }
};

export default BinarySearchTree;
