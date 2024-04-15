import type { User } from "@firebase/auth";
import type { Color } from "chess.js";

export type BaseUser = Pick<User, "displayName">;

export interface ActiveUser extends BaseUser {
  readonly sessionCount: number;
}

export type ActiveUserRecord = Readonly<Record<User["uid"], ActiveUser>>;

export enum PlayerNumber {
  playerOne = 1,
  playerTwo = 2,
}

export interface MatchPlayerInfo extends BaseUser {
  readonly color: Color;
  readonly playerNumber: PlayerNumber;
}

export type MatchPlayerRecord = Readonly<Record<User["uid"], MatchPlayerInfo>>;

export interface State {
  readonly fen: string | false;
}

export interface Match {
  readonly state: State;
  readonly players: MatchPlayerRecord;
}

export type MatchId = string;

export type MatchRecord = Readonly<Record<MatchId, Match>>;
