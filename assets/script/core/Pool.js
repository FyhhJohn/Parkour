cc.Class({
    name: 'Pool',
    properties: {
        dotPool: null,
        dotPrefab: null,
        enemy1Pool: null,
        enemy1Prefab: null,
        enemy2Pool: null,
        enemy2Prefab: null,
        enemy3Pool: null,
        enemy3Prefab: null,
        enemy4Pool: null,
        enemy4Prefab: null,
        enemy5Pool: null,
        enemy5Prefab: null,
        enemyPool: null,
        enemyPrefab: null,

        dotInitCount: 40,
        enemy1InitCount: 10,
        enemy2InitCount: 12,
        enemy3InitCount: 3,
        enemy4InitCount: 4,
        enemy5InitCount: 2,
    },

    initPool: function () {
        // dot
        // this.dotPool = new cc.NodePool();
        // cc.loader.loadRes('prefab/dot', (err, prefab) => {
        //     this.dotPrefab = prefab;
        //     for (let i = 0; i < this.dotInitCount; ++i) {
        //         this.dotPool.put(cc.instantiate(prefab));
        //     }
        // });
        // enenmy 1
        // this.enemy1Pool = new cc.NodePool();
        // cc.loader.loadRes('prefab/Enemy1', (err, prefab) => {
        //     this.enemy1Prefab = prefab;
        //     for (let i = 0; i < this.enemy1InitCount; ++i) {
        //         this.enemy1Pool.put(cc.instantiate(prefab));
        //     }
        // });
        // enenmy 2
        // this.enemy2Pool = new cc.NodePool();
        // cc.loader.loadRes('prefab/Enemy2', (err, prefab) => {
        //     this.enemy2Prefab = prefab;
        //     for (let i = 0; i < this.enemy2InitCount; ++i) {
        //         this.enemy2Pool.put(cc.instantiate(prefab));
        //     }
        // });
        // enenmy 3
        // this.enemy3Pool = new cc.NodePool();
        // cc.loader.loadRes('prefab/Enemy3', (err, prefab) => {
        //     this.enemy3Prefab = prefab;
        //     for (let i = 0; i < this.enemy3InitCount; ++i) {
        //         this.enemy3Pool.put(cc.instantiate(prefab));
        //     }
            
        // });
        // enenmy 4
        // this.enemy4Pool = new cc.NodePool();
        // cc.loader.loadRes('prefab/Enemy4', (err, prefab) => {
        //     this.enemy4Prefab = prefab;
        //     for (let i = 0; i < this.enemy4InitCount; ++i) {
        //         this.enemy4Pool.put(cc.instantiate(prefab));
        //     }
        // });
        // enenmy 5
        // this.enemy5Pool = new cc.NodePool();
        // cc.loader.loadRes('prefab/Enemy5', (err, prefab) => {
        //     this.enemy5Prefab = prefab;
        //     for (let i = 0; i < this.enemy5InitCount; ++i) {
        //         this.enemy5Pool.put(cc.instantiate(prefab));
        //     }
        // });
        this.enemy1Pool = new cc.NodePool();
        cc.loader.loadRes('prefab/enemy/Enemy_3', (err, prefab) => {
            this.enemy1Prefab = prefab;
            for (let i = 0; i < this.enemy1InitCount; ++i) {
                this.enemy1Pool.put(cc.instantiate(prefab));
            }
        });
        this.enemy2Pool = new cc.NodePool();
        cc.loader.loadRes('prefab/enemy/Enemy_1', (err, prefab) => {
            this.enemy2Prefab = prefab;
            for (let i = 0; i < this.enemy2InitCount; ++i) {
                this.enemy2Pool.put(cc.instantiate(prefab));
            }
        });
        this.enemy3Pool = new cc.NodePool();
        cc.loader.loadRes('prefab/enemy/Enemy_6', (err, prefab) => {
            this.enemy3Prefab = prefab;
            for (let i = 0; i < this.enemy3InitCount; ++i) {
                this.enemy3Pool.put(cc.instantiate(prefab));
            }
        });
        this.enemy4Pool = new cc.NodePool();
        cc.loader.loadRes('prefab/enemy/Enemy_7', (err, prefab) => {
            this.enemy4Prefab = prefab;
            for (let i = 0; i < this.enemy4InitCount; ++i) {
                this.enemy4Pool.put(cc.instantiate(prefab));
            }
        });
        this.enemy5Pool = new cc.NodePool();
        cc.loader.loadRes('prefab/enemy/Enemy_2', (err, prefab) => {
            this.enemy5Prefab = prefab;
            for (let i = 0; i < this.enemy5InitCount; ++i) {
                this.enemy5Pool.put(cc.instantiate(prefab));
            }
        });
    },

    getDot: function () {
        if (this.dotPool.size() > 0) {
            return this.dotPool.get();
        }
        // cc.log('create dot');
        return cc.instantiate(this.dotPrefab);
    },

    putDot: function (node) {
        // cc.log('put dot');
        this.dotPool.put(node);
    },

    getEnemy: function (id) {
        id = parseInt(id);
        if (id === 1) {
            this.enemyPool = this.enemy1Pool;
            this.enemyPrefab = this.enemy1Prefab;
        } else if (id === 2) {
            this.enemyPool = this.enemy2Pool;
            this.enemyPrefab = this.enemy2Prefab;
        } else if (id === 3) {
            this.enemyPool = this.enemy3Pool;
            this.enemyPrefab = this.enemy3Prefab;
        } else if (id === 4) {
            this.enemyPool = this.enemy4Pool;
            this.enemyPrefab = this.enemy4Prefab;
        } else if (id === 5) {
            this.enemyPool = this.enemy5Pool;
            this.enemyPrefab = this.enemy5Prefab;
        }

        if (this.enemyPool.size() > 0) {
            return this.enemyPool.get();
        }
        return cc.instantiate(this.enemyPrefab);
    },

    putEnemy: function (id, node) {
        // id = parseInt(id);
        if (id === 1) {
            this.enemy1Pool.put(node);
        } else if (id === 2) {
            this.enemy2Pool.put(node);
        } else if (id === 3) {
            this.enemy3Pool.put(node);
        } else if (id === 4) {
            this.enemy4Pool.put(node);
        } else if (id === 5) {
            this.enemy5Pool.put(node);
        }
    },
});
