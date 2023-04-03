import { faker } from "@faker-js/faker";
import { random, sample } from "lodash";
import db from "../firebase";
// ----------------------------------------------------------------------

export const getUserData = async () => {
  const res = [];
  await db
    .collection("tips")
    .get()
    .then((tips) => {
      tips.forEach((tip) => res.push(tip.data()));
    });
  console.log(res.length, "fetched from tips", res);
  console.log("UserList res", res);
  return res;
};

var users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  // TipId: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  place: sample([
    "DN NAGAR",
    "VERSOVA",
    "GOREGAON",
    "MALAD",
    "ANDHERI",
    "JUHU Versova",
    "KANDIVALI",
  ]),
  score: random(10, 100, false).toString(),
  isVerified: faker.datatype.boolean(),
  status: sample(["Successfully Solved", "In-Progress", "rejected"]),
  description: sample([
    "kidnapper abducted a child from a playground",
    "drug dealer was caught selling narcotics",
    "pickpocket stole a wallet from a commuter",
    "fraudster used a stolen credit card",
    " threatening messages and phone calls",
    "counterfeiter produced fake money",
    "pyromaniac started a fire",
    "A smuggler tried to sneak contraband ",
    "A hitman was hired to assassinate",
    "hit-and-run driver struck a pedestrian",
    "thief broke into a convenience store",
    "A shoplifter stole several items",
    "hacker gained access to a company's database",
  ]),
}));

export default users;
