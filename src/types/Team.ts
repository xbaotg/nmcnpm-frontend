import { Player } from "./Player";

export type Team = {
  name: string;
  logo: string;
  logo_high?: string;
  shortName: string;
  stadium?: string;
  players?: Player[];
};
