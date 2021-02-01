
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Books',
    [
      {
        title: 'The Name of the Wind (The Kingkiller Chronicle, #1)',
        author: 'Patrick',
        summary: 'I have stolen princesses back from sleeping barrow kings...',//  I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.
        isbn: '9781473211896',
        genre: ':Fantasy,Science Fiction',
        createdAt: new Date(),
        updatedAt: new Date(),
        
      },
      {
        title: 'Apes and Angels',
        author: 'Bova',
        summary: 'Humankind headed out to the stars not for conquest, nor explo..',//ration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...
        isbn: '9780765379528',
        genre: 'horror',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Books', null, {}),
};