async function _weaponsjsprompt(message, defaultValue = "") {
    return new Promise(resolve => {
        promptInput(message, (result) => {
            resolve(result);
        }, "weapons.js is asking you...", defaultValue);
    });
}

// Ignore rules so bombers don't detonate their own dropped payloads
if (!elements.bomb.ignore) { elements.bomb.ignore = []; }
elements.bomb.ignore.push("bomber_left", "bomber_right", "super_bomber_left", "super_bomber_right");

elements.tsar_bomba = {
    color: "#524C41",
    behavior: [
        "XX|EX:150>plasma|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:150>plasma|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
};

elements.left_missile = {
    color: "#4c4e42",
    behavior: [
        "M2|EX:10|XX",
        "M1 AND EX:10|XX|EX:10",
        "M2|EX:10|XX",
    ],
    state: "solid",
    category: "ammunition",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
};

elements.right_missile = {
    color: "#4c4e42",
    behavior: [
        "XX|EX:10|M2",
        "EX:10|XX|M1 AND EX:10",
        "XX|EX:10|M2",
    ],
    state: "solid",
    category: "ammunition",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
};

elements.up_missile = {
    color: "#4c4e42",
    behavior: [
        "M2|M1 AND EX:10|M2",
        "EX:10|XX|EX:10",
        "XX|EX:10|XX",
    ],
    state: "solid",
    category: "ammunition",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
};

elements.cluster_munition = {
    color: "#444444",
    behavior: [
        "XX|EX:10>smoke,smoke,smoke,smoke,bomb,bomb|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:10>smoke,smoke,smoke,smoke,bomb,cluster_munition|M2",
    ],
    ignore: ["bomber_left", "bomber_right", "super_bomber_left", "super_bomber_right"],
    category: "weapons",
    state: "solid",
    density: 1300,
};

elements.cluster = {
    color: "#444444",
    behavior: [
        "XX|EX:10%10|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:10%10|M2",
    ],
    category: "ammunition",
    state: "solid",
    density: 1300,
};

elements.machine_gun_left = {
    color: "#C0C0C0",
    behavior: [
        "XX|XX|XX",
        "CR:fast_bullet_left|XX|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
};

elements.machine_gun_right = {
    color: "#C0C0C0",
    behavior: [
        "XX|XX|XX",
        "XX|XX|CR:fast_bullet_right",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
};

elements.e_gun_left = {
    color: "#C0C0C0",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "CR:fast_bullet_left|XX|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    conduct: 1,
    density: 1300,
};

elements.e_gun_right = {
    color: "#C0C0C0",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "XX|XX|CR:fast_bullet_right",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    conduct: 1,
    density: 1300,
};

elements.auto_rocket_launcher_left = {
    color: "#C0C0C0",
    behavior: [
        "XX|XX|XX",
        "CR:left_rocket|XX|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
};

elements.auto_rocket_launcher_right = {
    color: "#C0C0C0",
    behavior: [
        "XX|XX|XX",
        "XX|XX|CR:right_rocket",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
};

elements.left_rocket = {
    color: "#4c4e42",
    behavior: [
        "XX|XX|XX",
        "M1 AND EX:10|XX|XX",
        "XX|XX|XX",
    ],
    state: "solid",
    category: "ammunition",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
};

elements.right_rocket = {
    color: "#4c4e42",
    behavior: [
        "XX|XX|XX",
        "XX|XX|M1 AND EX:10",
        "XX|XX|XX",
    ],
    state: "solid",
    category: "ammunition",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
};

elements.e_rocket_launcher_left = {
    color: "#C0C0C0",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "CR:left_rocket|XX|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    conduct: 1,
    density: 1300,
};

elements.e_rocket_launcher_right = {
    color: "#C0C0C0",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "XX|XX|CR:right_rocket",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    conduct: 1,
    density: 1300,
};

elements.fast_bullet_left = {
    color: "#4c4e42",
    behavior: [
        "XX|DL|XX",
        "XX|XX|XX",
        "XX|DL|XX",
    ],
    tick: function(pixel) {
        for (var i = 0; i < 4; i++) {
            if (!tryMove(pixel, pixel.x - 3, pixel.y)) {
                if (!isEmpty(pixel.x - 3, pixel.y, true)) {
                    var newPixel = pixelMap[pixel.x - 3][pixel.y];
                    if (newPixel.element === "fast_bullet_left") { break; }
                    if (elements[newPixel.element].state == "solid") {
                        if (Math.random() > (elements[newPixel.element].hardness || 0) * 0.2) {
                            if (elements[newPixel.element].breakInto) {
                                breakPixel(newPixel);
                            } else {
                                deletePixel(newPixel.x, newPixel.y);
                            }
                        }
                    }
                }
                if (Math.random() < 0.2) {
                    deletePixel(pixel.x, pixel.y);
                }
                break;
            }
        }
    },
    category: "ammunition",
    state: "solid",
    insulate: true,
};

elements.fast_bullet_right = {
    color: "#4c4e42",
    behavior: [
        "XX|DL|XX",
        "XX|XX|XX",
        "XX|DL|XX",
    ],
    tick: function(pixel) {
        for (var i = 0; i < 4; i++) {
            if (!tryMove(pixel, pixel.x + 3, pixel.y)) {
                if (!isEmpty(pixel.x + 3, pixel.y, true)) {
                    var newPixel = pixelMap[pixel.x + 3][pixel.y];
                    if (newPixel.element === "fast_bullet_right") { break; }
                    if (elements[newPixel.element].state == "solid") {
                        if (Math.random() > (elements[newPixel.element].hardness || 0) * 0.2) {
                            if (elements[newPixel.element].breakInto) {
                                breakPixel(newPixel);
                            } else {
                                deletePixel(newPixel.x, newPixel.y);
                            }
                        }
                    }
                }
                if (Math.random() < 0.2) {
                    deletePixel(pixel.x, pixel.y);
                }
                break;
            }
        }
    },
    category: "ammunition",
    state: "solid",
    insulate: true,
};

elements.flak_cannon = {
    color: "#C0C0C0",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|CR:flak|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    conduct: 1,
};

elements.flak = {
    color: "#f0f0f0",
    tick: function(pixel) {
        if ((pixel.temp > 10 || pixel.charge) && !pixel.burning) {
            pixel.burning = true;
            pixel.burnStart = pixelTicks;
        }
        if (pixel.burning) {
            if (!tryMove(pixel, pixel.x, pixel.y - 1)) {
                tryMove(pixel, pixel.x + (Math.random() < 0.5 ? -1 : 1), pixel.y - 1);
            }
            if (pixelTicks - pixel.burnStart > 50 && Math.random() < 0.005) {
                explodeAt(pixel.x, pixel.y, 10, "flak_shrapnel");
            }
        } else {
            if (!tryMove(pixel, pixel.x, pixel.y + 1)) {
                tryMove(pixel, pixel.x + (Math.random() < 0.5 ? -1 : 1), pixel.y + 1);
            }
        }
        doDefaults(pixel);
    },
    burn: 90,
    burnTime: 100,
    density: 2000,
    conduct: 1,
    state: "solid",
    category: "ammunition"
};

elements.flak_shrapnel = {
    color: "#71797E",
    behavior: [
        "XX|XX|XX",
        "XX|EX:5 %10|XX",
        "M2|M1|M2",
    ],
    burn: 90,
    burnTime: 100,
    density: 2000,
    conduct: 1,
    state: "solid",
    category: "ammunition"
};

// --- AIRCRAFTS ---

elements.fighter_jet_left = {
    color: "#bcc6cc",
    behavior: [
        "M1%0.2|M2%0.005 AND EX:5>metal_scrap|M2%0.005 AND EX:5>metal_scrap",
        "M1 AND CR:fast_bullet_left|XX|CR:smoke AND EX:5>metal_scrap",
        "M1%0.2|M2%0.005 AND EX:5>metal_scrap|M2%0.005 AND EX:5>metal_scrap",
    ],
    tick: function(pixel) {
        for (var i = 0; i < 2; i++) {
            if (!tryMove(pixel, pixel.x - 1, pixel.y)) {
                if (!isEmpty(pixel.x - 1, pixel.y, true)) {
                    var newPixel = pixelMap[pixel.x - 1][pixel.y];
                    if (newPixel.element === "fast_bullet_left") { break; }
                    if (elements[newPixel.element].state == "solid") {
                        if (Math.random() > (elements[newPixel.element].hardness || 0)) {
                            if (elements[newPixel.element].breakInto) {
                                breakPixel(newPixel);
                            } else {
                                deletePixel(newPixel.x, newPixel.y);
                            }
                        }
                    }
                }
                deletePixel(pixel.x, pixel.y);
                break;
            }
        }
    },
    category: "aircrafts",
    breakInto: "metal_scrap"
};

elements.fighter_jet_right = {
    color: "#bcc6cc",
    behavior: [
        "M2%0.005 AND EX:5>metal_scrap|M2%0.005 AND EX:5>metal_scrap|M1%0.2",
        "CR:smoke AND EX:5>metal_scrap|XX|M1 AND CR:fast_bullet_right",
        "M2%0.005 AND EX:5>metal_scrap|M2%0.005 AND EX:5>metal_scrap|M1%0.2",
    ],
    tick: function(pixel) {
        for (var i = 0; i < 2; i++) {
            if (!tryMove(pixel, pixel.x + 1, pixel.y)) {
                if (!isEmpty(pixel.x + 1, pixel.y, true)) {
                    var newPixel = pixelMap[pixel.x + 1][pixel.y];
                    if (newPixel.element === "fast_bullet_right") { break; }
                    if (elements[newPixel.element].state == "solid") {
                        if (Math.random() > (elements[newPixel.element].hardness || 0)) {
                            if (elements[newPixel.element].breakInto) {
                                breakPixel(newPixel);
                            } else {
                                deletePixel(newPixel.x, newPixel.y);
                            }
                        }
                    }
                }
                deletePixel(pixel.x, pixel.y);
                break;
            }
        }
    },
    category: "aircrafts",
    breakInto: "metal_scrap"
};

elements.airliner_left = {
    color: "#fafafa",
    category: "aircrafts",
    behavior: [
        "M1%3 AND EX:7>fire,fire,fire,metal_scrap|XX|XX",
        "M1 AND EX:7>fire,fire,fire,metal_scrap|XX|XX",
        "M1%3 AND EX:7>fire,fire,fire,metal_scrap|XX|CR:smoke%10",
    ],
    burnTime: 1000,
    burn: 40,
    burnInto: "metal_scrap",
    breakInto: "metal_scrap",
    conduct: 1
};

elements.airliner_right = {
    color: "#fafafa",
    category: "aircrafts",
    behavior: [
        "XX|XX|M1%3 AND EX:7>fire,fire,fire,metal_scrap",
        "XX|XX|M1 AND EX:7>fire,fire,fire,metal_scrap",
        "CR:smoke%10|XX|M1%3 AND EX:7>fire,fire,fire,metal_scrap",
    ],
    burnTime: 1000,
    burn: 40,
    burnInto: "metal_scrap",
    breakInto: "metal_scrap",
    conduct: 1
};

elements.bomber_left = {
    color: "#fafafa",
    category: "aircrafts",
    behavior: [
        "M1%3 AND EX:7>fire,fire,fire,metal_scrap|XX|XX",
        "M1 AND EX:7>fire,fire,fire,metal_scrap|XX|XX",
        "M1%3 AND EX:7>fire,fire,fire,metal_scrap|XX|CR:smoke%10 AND CR:cluster_munition",
    ],
    ignore: ["bomb", "cluster_munition"],
    burnTime: 1000,
    burn: 40,
    burnInto: "metal_scrap",
    breakInto: "metal_scrap",
    conduct: 1
};

elements.bomber_right = {
    color: "#fafafa",
    category: "aircrafts",
    behavior: [
        "XX|XX|M1%3 AND EX:7>fire,fire,fire,metal_scrap",
        "XX|XX|M1 AND EX:7>fire,fire,fire,metal_scrap",
        "CR:smoke%10 AND CR:cluster_munition|XX|M1%3 AND EX:7>fire,fire,fire,metal_scrap",
    ],
    ignore: ["bomb", "cluster_munition"],
    burnTime: 1000,
    burn: 40,
    burnInto: "metal_scrap",
    breakInto: "metal_scrap",
    conduct: 1
};

elements.super_bomber_left = {
    color: "#000000",
    category: "aircrafts",
    behavior: [
        "XX|XX|XX|XX|XX",
        "XX|M1%3 AND EX:7>fire,fire,fire,metal_scrap|XX|XX|XX",
        "XX|M1 AND EX:7>fire,fire,fire,metal_scrap|XX|XX|XX",
        "XX|M1%3 AND CR:cluster_munition|CR:cluster_munition|CR:smoke%10 AND CR:cluster_munition|XX",
        "XX|CR:cluster_munition|CR:cluster_munition|CR:cluster_munition|XX",
    ],
    ignore: ["bomb", "cluster_munition"],
    burnTime: 1000,
    burn: 40,
    burnInto: "metal_scrap",
    breakInto: "metal_scrap",
    conduct: 1
};

elements.super_bomber_right = {
    color: "#000000",
    category: "aircrafts",
    behavior: [
        "XX|XX|XX|XX|XX",
        "XX|XX|XX|M1%3 AND EX:7>fire,fire,fire,metal_scrap|XX",
        "XX|XX|XX|M1 AND EX:7>fire,fire,fire,metal_scrap|XX",
        "XX|CR:smoke%10 AND CR:cluster_munition|CR:cluster_munition|M1%3 AND CR:cluster_munition|XX",
        "XX|CR:cluster_munition|CR:cluster_munition|CR:cluster_munition|XX",
    ],
    ignore: ["bomb", "cluster_munition"],
    burnTime: 1000,
    burn: 40,
    burnInto: "metal_scrap",
    breakInto: "metal_scrap",
    conduct: 1
};

// --- REMAINING WEAPONS & MACHINES ---

elements.machine_for_throwing_bombs_at_you_left = {
    color: "#524c41",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "CR:bombs_for_throwing_at_you_left|XX|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    conduct: 1
};

elements.bombs_for_throwing_at_you_left = {
    color: "#524c41",
    category: "ammunition",
    behavior: [
        "XX|EX:10>bomb|XX",
        "XX|XX|XX",
        "M1 AND EX:10>bomb|M1%10 AND EX:10>bomb|XX",
    ],
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
};

elements.machine_for_throwing_bombs_at_right = {
    color: "#524c41",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "XX|XX|CR:bombs_for_throwing_at_you_right",
        "XX|XX|XX",
    ],
    category: "weapons",
    conduct: 1
};

elements.bombs_for_throwing_at_you_right = {
    color: "#524c41",
    category: "ammunition",
    behavior: [
        "XX|EX:10>bomb|XX",
        "XX|XX|XX",
        "XX|M1%10 AND EX:10>bomb|M1 AND EX:10>bomb",
    ],
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
};

elements.energized_orb_left = {
    color: ["#e0e000", "#f3f300"],
    category: "energy",
    behavior: [
        "XX|EX:50>electric|XX",
        "M1 AND EX:50>electric|XX|EX:50>electric",
        "XX|EX:50>electric|XX"
    ],
    state: "gas",
};

elements.energized_orb_right = {
    color: ["#e0e000", "#f3f300"],
    category: "energy",
    behavior: [
        "XX|EX:50>electric|XX",
        "EX:50>electric|XX|M1 AND EX:50>electric",
        "XX|EX:50>electric|XX"
    ],
    state: "gas",
};

elements.fast_bomb = {
    color: "#524c41",
    category: "weapons",
    state: "solid",
    behavior: [
        "XX|EX:10>explosion|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:10>explosion|M2",
    ],
    tick: function(pixel) {
        for (var i = 0; i < 3; i++) {
            tryMove(pixel, pixel.x, pixel.y + 1);
        }
    },
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
};

elements.tank_left = {
    color: "#bcc6cc",
    category: "vehicles",
    behavior: [
        "M2 AND CR:fast_bullet_left|XX|XX",
        "M1|XX|XX",
        "M1|M1|XX",
    ],
};

elements.tank_right = {
    color: "#bcc6cc",
    category: "vehicles",
    behavior: [
        "XX|XX|M2 AND CR:fast_bullet_right,left_rocket",
        "XX|XX|M1",
        "XX|M1|M1",
    ],
};

elements.realistic_missile_left = {
    color: "#524c41",
    category: "weapons",
    state: "solid",
    behavior: [
        "XX|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|XX",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|M2 AND EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|M1 AND EX:20>missile_shrapnel|XX|EX:20>missile_shrapnel|CR:smoke AND EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|M2 AND EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "XX|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|XX",
    ],
    tick: function(pixel) {
        for (var i = 0; i < 3; i++) {
            tryMove(pixel, pixel.x - 1, pixel.y);
        }
    },
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
};

elements.realistic_missile_right = {
    color: "#524c41",
    category: "weapons",
    state: "solid",
    behavior: [
        "XX|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|XX",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|M2 AND EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|CR:smoke AND EX:20>missile_shrapnel|EX:20>missile_shrapnel|XX|M1|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|M2 AND EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "XX|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|XX",
    ],
    tick: function(pixel) {
        for (var i = 0; i < 3; i++) {
            tryMove(pixel, pixel.x + 1, pixel.y);
        }
    },
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
};

elements.missile_shrapnel = {
    color: "#71797E",
    behavior: [
        "XX|XX|XX",
        "XX|EX:5 %20|XX",
        "M2%20|M1%20|M2%20",
    ],
    burn: 90,
    burnTime: 100,
    density: 2000,
    conduct: 1,
    state: "solid",
    category: "ammunition"
};

elements.vlms_left = {
    color: "#71797E",
    tick: function(pixel) {
        if ((pixel.temp > 1000 || pixel.charge) && !pixel.burning) {
            pixel.burning = true;
            pixel.burnStart = pixelTicks;
        }
        if (pixel.burning) {
            if (!tryMove(pixel, pixel.x, pixel.y - 1)) {
                tryMove(pixel, pixel.x + (Math.random() < 0.5 ? -1 : 1), pixel.y - 1);
            }
            if (pixelTicks - pixel.burnStart > 50 && Math.random() < 0.1) {
                explodeAt(pixel.x, 10, 4, "realistic_missile_left");
                deletePixel(pixel.x, pixel.y);
            }
        } else {
            if (!tryMove(pixel, pixel.x, pixel.y + 1)) {
                tryMove(pixel, pixel.x + (Math.random() < 0.5 ? -1 : 1), pixel.y + 1);
            }
        }
        doDefaults(pixel);
    },
    burn: 90,
    burnTime: 100,
    density: 2000,
    conduct: 1,
    state: "solid",
    category: "weapons"
};

elements.vlms_right = {
    color: "#71797E",
    tick: function(pixel) {
        if ((pixel.temp > 1000 || pixel.charge) && !pixel.burning) {
            pixel.burning = true;
            pixel.burnStart = pixelTicks;
        }
        if (pixel.burning) {
            if (!tryMove(pixel, pixel.x, pixel.y - 1)) {
                tryMove(pixel, pixel.x + (Math.random() < 0.5 ? -1 : 1), pixel.y - 1);
            }
            if (pixelTicks - pixel.burnStart > 50 && Math.random() < 0.1) {
                explodeAt(pixel.x, 10, 4, "realistic_missile_right");
                deletePixel(pixel.x, pixel.y);
            }
        } else {
            if (!tryMove(pixel, pixel.x, pixel.y + 1)) {
                tryMove(pixel, pixel.x + (Math.random() < 0.5 ? -1 : 1), pixel.y + 1);
            }
        }
        doDefaults(pixel);
    },
    burn: 90,
    burnTime: 100,
    density: 2000,
    conduct: 1,
    state: "solid",
    category: "weapons"
};

var createAtXvar = 0;
var createAtYvar = 0;
var create1var = "";
elements.element_spawner = {
    color: "#71797E",
    onSelect: async function() {
        var answer1 = await _weaponsjsprompt("Please input the x value.", (createAtXvar || undefined));
        if (!answer1) { return; }
        createAtXvar = parseInt(answer1);
        var answer2 = await _weaponsjsprompt("Please input the y value.", (createAtYvar || undefined));
        if (!answer2) { return; }
        createAtYvar = parseInt(answer2);
        var answer3 = await _weaponsjsprompt("Please input what element should spawn.", (create1var || undefined));
        if (!answer3) { return; }
        create1var = answer3;
    },
    tick: function(pixel) {
        if (pixel.charge) {
            createPixel(create1var, createAtXvar, createAtYvar);
        }
        doDefaults(pixel);
    },
    density: 1,
    conduct: 1,
    state: "solid",
    category: "machines"
};

elements.railgun_beam_left = {
    color: ["#ff0000", "#ff5e00"],
    tick: function(pixel) {
        var y = pixel.y;
        for (var x = pixel.x; x >= 0; x--) {
            if (outOfBounds(x, y)) {
                break;
            }
            if (isEmpty(x, y)) {
                createPixel("railgun_ammo_left", x, y);
                pixelMap[x][y].temp = 3500;
            } else {
                if (elements[pixelMap[x][y].element].isGas) { continue; }
                if (elements[pixelMap[x][y].element].id === elements.railgun_beam_left.id) { break; }
                pixelMap[x][y].temp += 100;
                pixelTempCheck(pixelMap[x][y]);
                break;
            }
        }
        deletePixel(pixel.x, pixel.y);
    },
    temp: 3500,
    category: "ammunition",
    state: "gas",
    density: 1,
    excludeRandom: true,
    noMix: true
};

elements.railgun_beam_right = {
    color: ["#ff0000", "#ff5e00"],
    tick: function(pixel) {
        var y = pixel.y;
        for (var x = pixel.x; x < width; x++) {
            if (outOfBounds(x, y)) {
                break;
            }
            if (isEmpty(x, y)) {
                createPixel("railgun_ammo_right", x, y);
                pixelMap[x][y].temp = 3500;
            } else {
                if (elements[pixelMap[x][y].element].isGas) { continue; }
                if (elements[pixelMap[x][y].element].id === elements.railgun_beam_right.id) { break; }
                pixelMap[x][y].temp += 100;
                pixelTempCheck(pixelMap[x][y]);
                break;
            }
        }
        deletePixel(pixel.x, pixel.y);
    },
    temp: 3500,
    category: "ammunition",
    state: "gas",
    density: 1,
    excludeRandom: true,
    noMix: true
};

elements.railgun_ammo_left = {
    color: ["#ff0000", "#ff5e00"],
    category: "ammunition",
    state: "solid",
    density: 1300,
    tick: function(pixel) {
        explodeAt(pixel.x, pixel.y, 10);
        doHeat(pixel);
    },
};

elements.railgun_ammo_right = {
    color: ["#ff0000", "#ff5e00"],
    category: "ammunition",
    state: "solid",
    density: 1300,
    tick: function(pixel) {
        explodeAt(pixel.x, pixel.y, 10);
        doHeat(pixel);
    },
};

elements.railgun_left = {
    category: "weapons",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "CR:railgun_beam_left|XX|XX",
        "XX|XX|XX",
    ],
    color: "#71797E",
    conduct: 1,
    hardness: 1,
};

elements.railgun_right = {
    category: "weapons",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "XX|XX|CR:railgun_beam_right",
        "XX|XX|XX",
    ],
    color: "#71797E",
    conduct: 1,
    hardness: 1,
};

elements.static_bomb = {
    color: "#524c41",
    behavior: [
        "XX|EX:10|XX",
        "EX:10|XX|EX:10",
        "XX|EX:10|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
};

var target = [,];
var tgt = "head";
elements.tracking_missile = {
    color: "#323232",
    category: "weapons",
    behavior: [
        "XX|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|XX",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|XX|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "XX|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|XX",
    ],
    onSelect: function() {
        var answer1 = prompt("Please input the target element.", (tgt || undefined));
        if (!answer1) { return; }
        tgt = answer1;
    },
    tick: (pixel) => {
        for (var x = 1; x < width; x++) {
            for (var y = 1; y < height; y++) {
                if (!isEmpty(x, y)) {
                    if (pixelMap[x][y].element === tgt) {
                        target = [pixelMap[x][y].x, pixelMap[x][y].y];
                    }
                }
            }
        }
        if (pixel.x != target[0] || pixel.y != target[1]) {
            let { x, y } = pixel;
            const empty = checkForEmptyPixels(x, y);
            const [tX, tY] = target;
            let bestVal = Math.sqrt(Math.pow(tX - x, 2) + Math.pow(tY - y, 2));
            let best = null;
            for (const pixelPair of empty) {
                const [x_, y_] = [x + pixelPair[0], y + pixelPair[1]];
                const c = Math.sqrt(Math.pow(tX - x_, 2) + Math.pow(tY - y_, 2));
                if (c < bestVal) {
                    bestVal = c;
                    best = pixelPair;
                }
            }
            if (best) {
                tryMove(pixel, x + best[0] * 2, y + best[1] * 2, undefined, true);
            }
        }
    }
};

elements.laser_bomb = {
    category: "weapons",
    color: "#524c41",
    tick: function(pixel) {
        var x = pixel.x;
        for (var y = pixel.y; y < height + 1; y++) {
            if (outOfBounds(x, y)) {
                if (isEmpty(x, y - 1)) { createPixel("smoke", x, y - 1); }
                break;
            }
            if (isEmpty(x, y)) {
                createPixel("flash", x, y);
                pixelMap[x][y].color = "#ff0000";
                pixelMap[x][y].temp = 35000;
                pixelMap[x][y].delay = (y + pixel.y) / 8;
            }
        }
        for (var y = pixel.y; y >= 0; y--) {
            if (outOfBounds(x, y)) {
                if (isEmpty(x, y + 1)) { createPixel("smoke", x, y + 1); }
                break;
            }
            if (isEmpty(x, y)) {
                createPixel("flash", x, y);
                pixelMap[x][y].color = "#ff0000";
                pixelMap[x][y].temp = 35000;
                pixelMap[x][y].delay = (y + pixel.y) / 8;
            }
        }
        var y = pixel.y;
        for (var x = pixel.x; x < width + 1; x++) {
            if (outOfBounds(x, y)) {
                if (isEmpty(x - 1, y)) { createPixel("smoke", x - 1, y); }
                break;
            }
            if (isEmpty(x, y)) {
                createPixel("flash", x, y);
                pixelMap[x][y].color = "#ff0000";
                pixelMap[x][y].temp = 35000;
                pixelMap[x][y].delay = (x + pixel.x) / 8;
            }
        }
        for (var x = pixel.x; x >= 0; x--) {
            if (outOfBounds(x, y)) {
                if (isEmpty(x + 1, y)) { createPixel("smoke", x + 1, y); }
                break;
            }
            if (isEmpty(x, y)) {
                createPixel("flash", x, y);
                pixelMap[x][y].color = "#ff0000";
                pixelMap[x][y].temp = 35000;
                pixelMap[x][y].delay = (x + pixel.x) / 8;
            }
        }
        deletePixel(pixel.x, pixel.y);
    },
};

var KA = false;
var KD = false;
var KW = false;
var KS = false;
var vX = 1;
var vY = 1;

document.onkeydown = function(ki) {
    if (ki.keyCode == 65) { KA = true; }
    if (ki.keyCode == 68) { KD = true; }
    if (ki.keyCode == 87) { KW = true; }
    if (ki.keyCode == 83) { KS = true; }
};

document.onkeyup = function(i2) {
    if (i2.keyCode == 65) { KA = false; }
    if (i2.keyCode == 68) { KD = false; }
    if (i2.keyCode == 87) { KW = false; }
    if (i2.keyCode == 83) { KS = false; }
};

elements.heli_bomb = {
    behavior: [
        "XX|EX:10|XX",
        "EX:10|XX|EX:10",
        "XX|EX:10|XX",
    ],
    tick: function(pixel) {
        if (KA === true) { tryMove(pixel, pixel.x - vX, pixel.y); }
        if (KD === true) { tryMove(pixel, pixel.x + vX, pixel.y); }
        if (KW === true) { tryMove(pixel, pixel.x, pixel.y - vY); }
        if (KS === true) { tryMove(pixel, pixel.x, pixel.y + vY); }
    },
    category: "weapons",
    state: "solid",
    color: "#524c41",
};
