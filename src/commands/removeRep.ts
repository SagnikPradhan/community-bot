import { Message } from 'discord.js';

import { database } from '../index';
import { RepEntity } from '../entities/Rep';

import { Command } from '../utils/commandHandler';

export const command = new Command({
  aliases: ['removerep'],
  description: 'Remove rep from someone',
  privelagesRequired: ['MANAGE_MESSAGES'],
  command: async (message: Message) => {
    const member = message.mentions.members.first();
    const amount = parseInt(message.content.split(' ')[2]);
  
    if (!member)
      return message.channel.send(
        `:x: You need to specify a member to remove rep from`,
      );
  
    if (!amount || isNaN(amount))
      return message.channel.send(
        `:x: You need to specify an amount of rep to remove`,
      );
  
    const repository = database.getRepository(RepEntity);
  
    const found = await repository.findOne({ id: member.id });
  
    if (!found || found.rep <= 0)
      return message.channel.send(`:x: This user has 0 reputation!`);
  
    found.rep -= amount;
  
    await repository.save(found);
  
    return message.channel.send(
      `:white_check_mark: Removed ${amount} from ${member.user.username}'s balance. They now have ${found.rep} reputation.`,
    );
  }
})

