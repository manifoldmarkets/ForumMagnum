import { registerMigration } from './migrationUtils';
import { createMutator } from '../vulcan-lib';
import Users from '../../lib/vulcan-users';

registerMigration({
  name: "createWikiImportUsers",
  dateWritten: "2020-09-03",
  idempotent: true,
  action: async () => {
    for (const username of newWikiUserNames) {
      await createMutator({
        collection: Users,
        document: {
          username,
          deleted: false,
          createdAt: new Date(),
          services: {},
          emails: [{address: `${username}@example.com`, verified: false}],
          email: `${username}@example.com`,
          lwWikiImport: true
        },
        validate: false
      })
    }
  }
})


const newWikiUserNames = ['Wellthisisaninconvenience',
 'Daniel Trenor',
 'PotatoDumplings',
 'Thisisinconvenient',
 'Costanza R',
 'A legion of trolls',
 'Pw201',
 'KP',
 'Toby Bartels',
 'Friendofasquid',
 'Intansrirahayu',
 'Gjm11',
 'Adam Atlas',
 'CurtisHargrove',
 'Veal',
 'Jamesmea',
 'Xadmin',
 'Jamesmeo',
 'Frost Shock Level 4',
 '86.129.245.179',
 'Emesmeo',
 'Kftnc',
 'Nataniel',
 'Niremetal',
 'Frankysl',
 'Justgerrardz',
 'Domtheo',
 'Flarn2006',
 'Econai',
 'Bailey Helton',
 'Natmaka',
 'Nlacombe',
 'Alan Dawrst',
 'Silent.ashes',
 'Pandeism',
 'Alfpog',
 'Thrinaxodon',
 'Claraliece',
 'Markus Ramikin',
 'Brent.Allsop',
 'Dustin Wyatt',
 'Andromeda',
 '153.18.17.22',
 'Amalion',
 'Dredmorbius',
 '75.101.20.150',
 'Aayn',
 'CamilleHopkins',
 'BritneyCraig',
 'Creditrepairfixcredit',
 'Cocktails019',
 'DBAtkins',
 'Debrasantorini',
 'DebraDeleon1955',
 'Daylmer',
 'BabySloth',
 'AudreyTang',
 'Reddittv',
 'Quotemstr',
 'Odcameron',
 'Nosovicki',
 'Nona3',
 'N4thanl',
 'Mrtricorder',
 'Mrice',
 'Moredoubts',
 'Mivpl',
 'Rhoark',
 'Edwga',
 'Vriska',
 'Vocapp',
 'Ujose73',
 'Thedoctor',
 'TheInterlang',
 'Seojobs23',
 'Sauski',
 'Russel08',
 'Mcpersonson',
 'Marimeoa',
 'Ipodsoft',
 'IgorLobanov',
 'HiEv',
 'Harry Wood',
 'Fordi',
 'Fargone',
 'Jja',
 'Ling123',
 'Zao79Pwgx',
 'JustMichael1984',
 'Jolinsa',
 '128.111.17.17']
