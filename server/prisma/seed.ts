import { prisma } from "../src/database";

async function main() {
	await prisma.project.createMany({
		data: [
			// good sites
			{
				project_name: "Azuki",
				contract_address: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
				website: "azuki.com",
				discord: "https://discord.gg/azuki",
				twitter: "https://twitter.com/azukizen",
				team_doxxed: true,
			},
			{
				project_name: "CLONE X - X TAKASHI MURAKAMI",
				contract_address: "0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B",
				website: "clonex.rtfkt.com",
				discord: "https://discord.gg/rtfkt",
				twitter: "https://twitter.com/rtfktstudios",
				instagram: "https://www.instagram.com/rtfktstudios/",
				team_doxxed: true,
			},
			{
				project_name: "Bored Ape Yacht Club",
				contract_address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
				website: "boredapeyachtclub.com",
				discord: "https://discord.gg/3P5K3dzgdB",
				twitter: "https://www.twitter.com/BoredApeYC",
				instagram: "https://www.instagram.com/boredapeyachtclub/",
				team_doxxed: true,
			},

			// bad sites
			{
				project_name: "AzukiWorld",
				risk_score: 100,
				website: "azuki.world",
			},
			{
				project_name: "MintAzukiStore",
				risk_score: 100,
				website: "mint-azuki.store",
			},
			{
				project_name: "MintAzukiClub",
				risk_score: 100,
				website: "mint-azuki.club",
			},
		],
	});
}

main();
