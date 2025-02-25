import { Message } from 'discord.js';
import { Command } from '../utils/commandHandler';

import { database } from '../index';
import { RepEntity } from '../entities/Rep';

export const command = new Command({
  aliases: ['getRep'],
  description: 'Get Rep Points',
  command: async (message: Message) => {
    const member = message.mentions.members.first()
      ? message.mentions.members.first()
      : message.member;
  
    const repository = database.getRepository(RepEntity);
  
    const found = await repository.findOne({ id: member.id });
  
    if (!found) {
      return message.channel.send(
        `:white_check_mark: ${member.user.username} has 0 reputation`,
      );
    }
  
    return message.channel.send(
      `:white_check_mark: ${member.user.username} has ${found.rep} reputation`,
    );
  }
})
