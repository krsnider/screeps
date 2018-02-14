var roleHarvester = require('Harvester');
var roleUpgrader = require('Upgrader');
var reporter = require('Reporter');

module.exports.loop = function () {

    //COLE IS A CHICKEN FUCKER

    if(Game.time % 5 == 0 ) {
        reporter.report();
    }

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'Harvester');


    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'Upgrader');

    if(upgraders.length < 2) {
        var newName = Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'Upgrader' + Game.time, {memory : {role: 'Upgrader'}});
        console.log('Spawning new upgrader: ' + newName);
    } else if(harvesters.length < 2) {
        var newName = Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'Harvester' + Game.time, {memory: {role: 'Harvester'}});
        console.log('Spawning new harvester: ' + newName);
    }

    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'Harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'Upgrader') {
            roleUpgrader.run(creep);
        }
    }
}