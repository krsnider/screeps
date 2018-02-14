var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'Harvester');

var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'Upgrader');
var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'Miner');


var Reporter = {

    report: () : void =>
    {
        var room = Game.rooms['W5N8'];
        var rep : string = "\nRoles: \n" +

            "\tHarvesters:\t" +  harvesters.length + "\n" +
            "\tUpgraders:\t" +  upgraders.length + "\n" +
            "\tMiners:\t\t" +  miners.length + "\n" +
            "\t-------------------\n" +
            "\tTotal:\t\t" + Object.keys(Game.creeps).length + "\n" +
            "\n" +
            "Room Info:\n" +
            "\tRoom Energy:\t" + room.energyAvailable + "/" + room.energyCapacityAvailable + "\n" +
            "\tRoller Prog:\t" + room.controller.progress + "/" + room.controller.progressTotal + "\n" +
            "\tRoller ToGo:\t" + (room.controller.progressTotal - room.controller.progress) + "\n";
        console.log(rep);
    }

};

module.exports = Reporter;