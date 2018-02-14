var roleHarvester = require('Harvester');
var roleUpgrader = require('Upgrader');
var roleBuilder = require('Builder');
var reporter = require('Reporter');

module.exports.loop = function ()
{
    var body_parts = [WORK, CARRY, MOVE];

    if(true) {
        if (!Memory.Sunny)
        {
            Memory.Sunny = {};
        }
        if (!Memory.Sunny.W5N8)
        {
            Memory.Sunny.W5N8 = {};
        }
        if (!Memory.Sunny.W5N8.lastApocolypse)
        {
            Memory.Sunny.W5N8.lastApocolypse = 0;
        } else
        {
            Memory.Sunny.W5N8.lastApocolypse += 1;
        }

        if (Object.keys(Game.creeps).length == 0) {
            Memory.Sunny.W5N8.lastApocolypse = 0;
        }

        if (Game.time % 5 == 0) {
            reporter.report();
        }

        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }

    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'Harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'Builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'Upgrader');

    if(upgraders.length < 3)
    {
        var newName = Game.spawns['Spawn1'].spawnCreep(body_parts, 'Upgrader' + Game.time, {memory : {role: 'Upgrader'}});

    } else if(harvesters.length < 2)
    {
        var newName = Game.spawns['Spawn1'].spawnCreep(body_parts, 'Harvester' + Game.time, {memory: {role: 'Harvester'}});
    } else if(builders.length < 2)
    {
        var newName = Game.spawns['Spawn1'].spawnCreep(body_parts, 'Builder' + Game.time, {memory: {role: 'Builder'}});

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
        if(creep.memory.role == 'Harvester')
        {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'Upgrader')
        {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'Builder')
        {
            roleBuilder.run(creep);
        }
    }
}