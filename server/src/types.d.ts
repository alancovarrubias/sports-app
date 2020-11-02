export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum Sport {
  Nba = 'NBA',
  Mlb = 'MLB'
}

export type Season = {
  __typename?: 'Season';
  id: Scalars['ID'];
  year: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  seasons: Array<Maybe<Season>>;
};


export type QuerySeasonsArgs = {
  sport: Sport;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

