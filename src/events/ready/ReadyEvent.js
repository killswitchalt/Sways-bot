const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    
  console.log(`${client.user.tag} is ready`);
 


    client.user.setActivity("Sways Realm", {
      type: "WATCHING"
    });

  }
}